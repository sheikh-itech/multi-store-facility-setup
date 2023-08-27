package org.msf.security;

import org.msf.service.MSFAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author Hapheej Sheikh
 * @since 1.0.0
 */

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(jsr250Enabled=true, prePostEnabled=true)
public class MSFSecurityConfig {

	@Autowired
	private MSFRequestHandler reqHandler;
	@Autowired
	private MSFAuthService msfAuthService;
	
	
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
       	
    	http.csrf().disable()
    	.authorizeRequests().antMatchers("/**").permitAll();
    	
    	http.csrf().disable()
    	.authorizeRequests().antMatchers("/**").permitAll().
				anyRequest().authenticated().and().
				exceptionHandling().and().sessionManagement()
		.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    	//http.addFilter(reqHandler);
    	http.addFilterBefore(reqHandler, UsernamePasswordAuthenticationFilter.class);
    	
        return http.build();
    }
    
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
            	registry.addMapping("/**").allowedOrigins("*")
            	.allowedMethods("*").allowedHeaders("*");
            }
        };
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        
		return new BCryptPasswordEncoder();
    }
    
    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
    	AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder.userDetailsService(msfAuthService);
        return authenticationManagerBuilder.build();
    }
}
