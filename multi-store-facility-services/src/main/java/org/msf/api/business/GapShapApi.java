package org.msf.api.business;

import org.msf.beans.GapShap;
import org.msf.beans.Response;
import org.msf.service.business.GapShapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("gapshap")
public class GapShapApi {

	@Autowired
	private GapShapService gapShapService;
	
	
	@RequestMapping(value="/add", method=RequestMethod.POST)
	public ResponseEntity<Response> addGapShap(@RequestBody GapShap gapShap) {
		
		Response res = new Response();
		HttpStatus status = HttpStatus.OK;
		
		try {
			
			res.setData(gapShapService.addGapShap(gapShap));
			res.setMessage("GapShap heading added");
			
		} catch(Exception ex) {
			status = HttpStatus.INTERNAL_SERVER_ERROR;
			res.setMessage("Failed to start new GapShap");
		}
		
		res.setStatus(status);
		return new ResponseEntity<Response>(res, HttpStatus.OK);
	}
	
	@RequestMapping(value="/update", method=RequestMethod.PATCH)
	public ResponseEntity<Response> updateGapShap(@RequestBody GapShap gapShap) {
		
		Response res = new Response();
		HttpStatus status = HttpStatus.OK;
		
		try {
			
			res.setData(gapShapService.updateGapShap(gapShap));
			res.setMessage("GapShap detail updated");
			
		} catch(Exception ex) {
			status = HttpStatus.INTERNAL_SERVER_ERROR;
			res.setMessage("Failed to update GapShap detail");
		}

		res.setStatus(status);
		return new ResponseEntity<Response>(res, HttpStatus.OK);
	}
}
