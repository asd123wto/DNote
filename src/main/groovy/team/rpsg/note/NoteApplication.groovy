package team.rpsg.note

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.context.annotation.ComponentScan

@SpringBootApplication
@ComponentScan(basePackages = "team.rpsg.note.controller")
class NoteApplication {

	static void main(String[] args) {
		SpringApplication.run NoteApplication, args
	}

}
