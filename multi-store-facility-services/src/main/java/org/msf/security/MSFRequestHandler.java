package org.msf.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.msf.service.MSFAuthService;
import org.msf.utils.MsfSecurityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.SignatureException;

@Service
public class MSFRequestHandler extends OncePerRequestFilter {

	@Autowired
	private MSFAuthService authService;
	@Autowired
	private MsfSecurityUtil securityUtil;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, 
			FilterChain chain) throws ServletException, IOException {

		if (request.getMethod().equalsIgnoreCase("OPTIONS")) {

			response.addHeader("Access-Control-Allow-Origin", "*");
			response.addHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
			response.addHeader("Access-Control-Allow-Headers",
					"Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Origin, Access-Control-Allow-Headers");
			return;

		} else if (request.getRequestURI().indexOf("/auth/user") > 0 ||
				request.getRequestURI().indexOf("/public") > 0) {
			chain.doFilter(request, response);
			return;
		}

		String token = "";
		String username = "";
		String authHeader = request.getHeader("Authorization");
        
        if (authHeader != null && authHeader.startsWith("MSF+")) {
        	
        	token = authHeader.substring(4);
            try {
            	username = securityUtil.extractUsername(token);
            } catch (IllegalArgumentException ex) {
                logger.error("an error occured during getting username from token", ex);
            } catch (ExpiredJwtException ex) {
                logger.warn("the token is expired and not valid anymore");
            } catch(SignatureException ex){
                logger.error("Authentication Failed. Username or Password not valid.");
            } catch(Exception ex) {
            	logger.error("Server error", ex);
            }
        }

        if (username!=null && username!="" && SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails = authService.loadUserByUsername(username);

            if (securityUtil.validateToken(token, userDetails)) {

                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                usernamePasswordAuthenticationToken
                        .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
            chain.doFilter(request, response);
        } else {
        	
       		response.sendError(HttpStatus.UNAUTHORIZED.value(), "Incorrect username or password");
        	return;
        }
	}
}
