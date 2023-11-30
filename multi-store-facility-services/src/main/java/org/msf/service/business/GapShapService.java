package org.msf.service.business;

import java.util.Date;

import org.msf.beans.GapShap;
import org.msf.dao.business.GapShapDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GapShapService {

	@Autowired
	private GapShapDao gapShapDao;
	
	
	public GapShap addGapShap(GapShap gapShap) {
		
		gapShap.setTimestamp(new Date());
		
		return gapShapDao.persistGapShap(gapShap);
	}
	
	public GapShap updateGapShap(GapShap gapShap) {
		
		return gapShapDao.updateGapShap(gapShap);
	}
}
