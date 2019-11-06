package com.andrei.licenta;

import org.jsondoc.spring.boot.starter.EnableJSONDoc;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
@ComponentScan()
@EnableJSONDoc
public class LicentaApplicationMain {
    public static void main(String[] args) {
        SpringApplication.run(LicentaApplicationMain.class, args);
    }
}
