package org.msf;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MSFLauncher {

	public static void main(String[] args) {
		SpringApplication.run(MSFLauncher.class, args);
		System.out.println("MSF Launcher up and running...");
	}
}
