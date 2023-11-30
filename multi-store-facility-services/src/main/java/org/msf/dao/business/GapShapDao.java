package org.msf.dao.business;

import org.msf.beans.GapShap;
import org.msf.utils.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.index.Index;
import org.springframework.stereotype.Repository;

@Repository
public class GapShapDao {

	@Autowired
	private MongoTemplate mongoTemplate;
	
	
	public GapShap persistGapShap(GapShap gapshap) {
		
		if(!mongoTemplate.collectionExists(Constants.MSF_GapShap)) {
			Index index = new Index();
			index.on("id", Sort.Direction.ASC).unique();
			mongoTemplate.indexOps(Constants.MSF_GapShap).ensureIndex(index);
		}
		
		return mongoTemplate.insert(gapshap, Constants.MSF_GapShap);
	}
	
	public GapShap updateGapShap(GapShap gapshap) {
		
		return mongoTemplate.save(gapshap, Constants.MSF_GapShap);
	}
}
