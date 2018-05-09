package team.rpsg.note

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory
import org.springframework.data.redis.core.RedisTemplate
import org.springframework.data.redis.serializer.GenericToStringSerializer
import org.springframework.data.redis.serializer.StringRedisSerializer
import org.springframework.web.method.support.HandlerMethodArgumentResolver
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.InterceptorRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter
import team.rpsg.note.custom.AuthenticationInterceptor
import team.rpsg.note.custom.UserMethodArgumentResolver

@SpringBootApplication
@Configuration
@EnableAutoConfiguration
@ComponentScan(basePackages = "team.rpsg.note.controller")
class NoteApplication extends WebMvcConfigurerAdapter{

	static void main(String[] args) {

		SpringApplication.run NoteApplication.class, args
	}

	@Bean
	JedisConnectionFactory jedisConnectionFactory() {
		new JedisConnectionFactory()
	}

	@Bean
	RedisTemplate<String, Object> redisTemplate() {
		final RedisTemplate<String, Object> template = new RedisTemplate<String, Object>()
		template.setConnectionFactory(jedisConnectionFactory())
		template.setKeySerializer(new StringRedisSerializer())
		template.setHashKeySerializer(new StringRedisSerializer())
		template.setHashValueSerializer(new GenericToStringSerializer<Object>(Object.class))
		template.setValueSerializer(new GenericToStringSerializer<Object>(Object.class))

		template
	}

	@Bean
	AuthenticationInterceptor AuthenticationInterceptor(){
		return new AuthenticationInterceptor()
	}

	@Override
	void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor AuthenticationInterceptor()
		super.addInterceptors registry
	}

	@Override
	void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
		argumentResolvers.add(new UserMethodArgumentResolver())
		super.addArgumentResolvers(argumentResolvers)
	}

	@Override
	void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**").allowedOrigins("*");
	}

}
