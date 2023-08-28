package org.msf.utils;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.servlet.http.HttpServletRequest;

import org.msf.beans.UserDetail;
import org.msf.exc.UserValidationException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

/**
 * @author Hapheej Sheikh
 * @since 1.0.0
 */

@Service
public class MsfSecurityUtil {

	@Value("${idleLoginTime: 0:10:0}")
	private String idleLoginTime;
	@Value(value="${securityKey: randomsecuritykey}")
	private String securityKey;
	
	public String extractUsername(String token) {
		
		return extractClaim(token, Claims::getSubject);
	}
	
	public String extractCustomClaim(String token, String claimName) {
		
		return extractAllClaims(token).get(claimName).toString();
	}
	
	public Date extractExpiration(String token) {
		
		return extractClaim(token, Claims::getExpiration);
	}
	
	private <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
		
		final Claims claim = extractAllClaims(token);
		return claimResolver.apply(claim);
	}

	private Claims extractAllClaims(String token) {
		
		return Jwts.parser().setSigningKey(securityKey).parseClaimsJws(token).getBody();
	}
	
	public Boolean isTokenExpired(String token) {
		
		return extractExpiration(token).before(new Date());
	}
	
	public String generateToken(UserDetails userDetail) {
		Map<String, Object> claims = new HashMap<>();
		
		return createToken(claims, userDetail.getUsername());
	}
	
	public String generateTokenForUser(String username) {
		
		Map<String, Object> claims = new HashMap<>();
		return createToken(claims, username);
	}
	
	public Map<String, String> getUserDetails(String token, String moduleCode) {
		
		Map<String, String> detail = new HashMap<>();
		
		final Claims claim = extractAllClaims(token);
		if(claim.get("userId")!=null)
			detail.put("userId", claim.get("userId").toString());
		if(claim.get("roleId")!=null)
			detail.put("roleId", claim.get("roleId").toString());
		if(claim.get("modules")!=null)
			detail.put("modules", claim.get("modules").toString());
		
		if(moduleCode!=null)
			detail.put(moduleCode, claim.get(moduleCode)==null?"":claim.get(moduleCode).toString());
		
		return detail;
	}
	
	public String generateToken(UserDetail user, Map<Integer, String> moduleMap) {
		
		Map<String, Object> claims = new HashMap<>();
		claims.put("userId", user.getUserId());
		claims.put("roleId", user.getRoleId());
		claims.put("modules", user.getModules());
		
		for(Integer key: moduleMap.keySet()) {
			claims.put(moduleMap.get(key), key);
		}
		
		return createToken(claims, user.getUsername());
	}

	private String createToken(Map<String, Object> claims, String username) {
			
		return	Jwts.builder().setClaims(claims).setSubject(username).setIssuedAt(new Date(System.currentTimeMillis()))
			.setExpiration(new Date(System.currentTimeMillis()+ idleTime()))
				.signWith(SignatureAlgorithm.HS256, securityKey).compact();
	}
	
	public Boolean validateToken(String token, UserDetails userDetails) {
		
		final String username = extractUsername(token);
		
		return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
	}
	
	private long idleTime() {
		
		long finalTime;
		
		String [] timeDetail = idleLoginTime.split(":");
		if(timeDetail.length==3) {
			
			int hours = Utility.parseInt(timeDetail[0]);
			int minutes = Utility.parseInt(timeDetail[1]);
			int seconds = Utility.parseInt(timeDetail[2]);
			
			hours = (hours<0 || hours>24) ? 0 : hours;
			minutes = (minutes<1 || minutes>60) ? 0 : minutes;
			seconds = (seconds<1 || seconds>60) ? 0 : seconds;
			
			finalTime = (hours*60*60*1000)+(minutes*60*1000)+(seconds*1000);
		} else 
			finalTime= 10*60*1000;
		
		return finalTime;
	}
	
	public String getUsername(HttpServletRequest request) throws UserValidationException {
		
		String token = null;
		final String authHeader = request.getHeader("Authorization");

		if (authHeader != null && authHeader.startsWith("MSF+"))
			token = authHeader.substring(4);

		if (token == null)
			throw new UserValidationException("Token Not Found");
		
		return extractUsername(token);
	}
	
	public String getUserId(HttpServletRequest request) throws UserValidationException {
		
		String token = null;
		final String authHeader = request.getHeader("Authorization");

		if (authHeader != null && authHeader.startsWith("MSF+"))
			token = authHeader.substring(4);

		if (token == null)
			throw new UserValidationException("Token Not Found");
		
		return extractCustomClaim(token, "userId");
	}
	
	public String getUserToken(HttpServletRequest request) {
		
		String token = null;
		
		final String authHeader = request.getHeader("Authorization");

		if (authHeader != null && authHeader.startsWith("MSF+"))
			token = authHeader.substring(4);
		
		return token;
	}
}
