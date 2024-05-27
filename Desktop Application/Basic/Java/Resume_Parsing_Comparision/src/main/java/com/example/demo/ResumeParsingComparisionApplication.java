package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ResumeParsingComparisionApplication {

	public static void main(String[] args) {
		SpringApplication.run(ResumeParsingComparisionApplication.class, args);
        String text1 = "We are looking for a skilled Java Software Development Engineer (SDE-1) to join our team. The ideal candidate should have expertise in Java development, particularly with Spring, JPA, Hibernate, SPEL, and REST APIs. Responsibilities include developing and maintaining Java-based applications, designing RESTful APIs, writing clean and efficient code, collaborating with the team lead/architect, performing testing and debugging, and staying updated with the latest technologies. Requirements include a Bachelor's degree in Computer Science or related field, strong Java programming skills, experience with Spring framework and database technologies, familiarity with SDLC methodologies, problem-solving abilities, and excellent communication skills.";
        String text2 = "EDUCATION DETAIL TECHNICAL SKILLS e C,HTML, CSS, BootStrap, JavaScript e §=6Core Java, Mysql e §=Python EXPERIENCE e CODE ALPHA Web developer Intern (1 Month). STRENGTH & HOBBIES e Gaming, Art e Learning New things and Exploring INTEREAST e Android Development e Mobile App Development e Blockchain e Game Development";
        CosineSimilarity.compare(text1, text2);
	}

}
