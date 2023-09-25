package org.msf.service.business;

import java.io.File;
import java.io.FilenameFilter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileStorageService {

	private static final Logger logger = LoggerFactory.getLogger(FileStorageService.class);
	
	@Value("${file.dir.path:./Product-Images}")
	private String baseFileDir;
	
	public boolean uploadFile(String clientDirPath, MultipartFile file) {
		
		try {
			
			if(!new File(baseFileDir).isDirectory())
				new File(baseFileDir).mkdirs();
			
			if(!new File(baseFileDir+File.separator+clientDirPath).isDirectory())
				new File(baseFileDir+File.separator+clientDirPath).mkdir();
			
			Path filePath = Paths.get(baseFileDir+File.separator+clientDirPath+File.separator+file.getOriginalFilename());
			
			Files.write(filePath, file.getBytes());
			
			return true;
			
		} catch(Exception ex) {
			logger.error("Error in writing product image: "+ex.getMessage());
			return false;
		}
	}
	
	public byte[] downloadFile(String clientDirPath, String fileName) {
		
		try {
			String uploadDir = baseFileDir+File.separator+clientDirPath+File.separator+fileName;
			            
            return Files.readAllBytes(Paths.get(uploadDir));
		} catch(Exception ex) {
			return null;
		}
	}
	
	public Resource downloadFileAsResource(String filePath) {
		
		try {
			String uploadDir = baseFileDir+File.separator+filePath;
			  
			return new FileSystemResource(new File(uploadDir));
			
		} catch(Exception ex) {
			return null;
		}
	}
	
	public boolean doesFileExist(String clientDirPath, String fileName) {
		
		try {
			File dir = new File(baseFileDir+File.separator+clientDirPath);
			
			if(dir.exists() && dir.isDirectory()) {
				String files[] = dir.list(new FilenameFilter() {
					@Override
					public boolean accept(File dir, String name) {
						if(name.equals(fileName))
							return true;
						return false;
					}
				});
				if(files.length>0 && files[0].equals(fileName))
					return true;
				else
					return false;
			} else
				return false;
			
		} catch(Exception ex) {
			logger.error("Failed to search filename: " + fileName);
			return false;
		}
	}
}
