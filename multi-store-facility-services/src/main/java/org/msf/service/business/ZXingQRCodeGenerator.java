package org.msf.service.business;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.List;

import javax.imageio.ImageIO;

import org.msf.beans.Product;
import org.msf.beans.QrInfo;
import org.msf.dao.business.TransactionalObjectsDao;
import org.msf.dao.business.ZXingQRCodeDao;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.mongodb.client.result.UpdateResult;

@Service
public class ZXingQRCodeGenerator {

	private static final Logger logger = LoggerFactory.getLogger(ZXingQRCodeGenerator.class);
	
	@Autowired
	private ZXingQRCodeDao qrCodeDao;
	@Autowired
	private FileStorageService storageService;
	@Autowired
	private TransactionalObjectsDao transObjectsDao;
	
	private QRCodeWriter qrWriter;
	@Value("${qrImageWidth:200}")
	private short imageWidth;
	@Value("${qrimageHeight:200}")
	private short imageHeight;
	
	public Product generateQRCode(Product productInfo, String userId, MultipartFile file) throws Exception {
		
		validateProduct(productInfo);
		
		BufferedImage image =  generateZXingQRCode(productInfo.toString());
		
		//Convert/Write the image to a byte array
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(image, "png", baos);
        byte[] imageBytes = baos.toByteArray();
        
        productInfo.getDetail().setImagePath(userId.toUpperCase()+"/"+file.getOriginalFilename());
        //Map<Object, String> docInfo = new HashMap<>();
        List<Object> docList = new ArrayList<>();
        docList.add(productInfo);
        docList.add(new QrInfo(productInfo.getId(), imageBytes));
        transObjectsDao.saveTransObjects(docList);
        
        if(!storageService.doesFileExist(userId, file.getOriginalFilename()))
        	storageService.uploadFile(userId, file);
        
        return productInfo;
	}
	
	public Product updateQRCode(Product productInfo) throws Exception {
		
		validateProduct(productInfo);
		
		BufferedImage image =  generateZXingQRCode(productInfo.toString());
		
		//Convert/Write the image to a byte array
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(image, "png", baos);
        byte[] imageBytes = baos.toByteArray();
        
        //Map<Object, String> docInfo = new HashMap<>();
        List<Object> docList = new ArrayList<>();
        docList.add(productInfo);
        docList.add(new QrInfo(productInfo.getId(), imageBytes));
        transObjectsDao.updateTransObjects(docList);
        
        return productInfo;
	}
	
	private BufferedImage generateZXingQRCode(String qrCodeText) throws Exception {
		
		if(qrWriter==null)
			qrWriter = new QRCodeWriter();
		
	    BitMatrix bitMatrix = null;
		try {
			bitMatrix = qrWriter.encode(qrCodeText, 
					BarcodeFormat.QR_CODE, imageWidth, imageHeight);
		} catch (WriterException ex) {
			logger.error("QR Code Generation error: "+ex.getMessage());
			throw new Exception("QR Code Generation error: "+ex.getMessage());
		}

	    return MatrixToImageWriter.toBufferedImage(bitMatrix);
	}
	
	public boolean verifyQrCode(String id, boolean verified) {
		
		UpdateResult outcome = qrCodeDao.verifyQrInfo(id, verified);
		
		if(outcome.getModifiedCount()>0)
			return true;
		
		return false;
	}
	
	public QrInfo findQRCodeById(String id) {
		
		if(id==null || id.length()<10)
			return null;
		
		return qrCodeDao.findQRCodeById(id);
	}
	
	private void validateProduct(Product productInfo) throws Exception {
		
		if(productInfo.getName()==null || productInfo.getName().isEmpty())
			throw new Exception("Invalid product name: "+productInfo.getName());
		
		if(productInfo.getPrice()<0.0f)
			throw new Exception("Invalid product price: "+productInfo.getPrice());
		
		if(productInfo.getId()==null || productInfo.getId().isEmpty())
			throw new Exception("Product Identification failed contact Tech Team");
	}
}
