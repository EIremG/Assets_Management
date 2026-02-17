package com.java.assets.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Aspect
@Component
public class LoggingAspect {
    
    private static final Logger logger = LoggerFactory.getLogger(LoggingAspect.class);
    
    /**
     * Controller methodlarından önce çalışır
     */
    @Before("execution(* com.pavza.assets.controller.*.*(..))")
    public void logBeforeController(JoinPoint joinPoint) {
        logger.info("═══════════════════════════════════════════");
        logger.info("▶ Executing: {}", joinPoint.getSignature().toShortString());
        logger.info("▶ Arguments: {}", Arrays.toString(joinPoint.getArgs()));
    }
    
    /**
     * Controller methodlarından sonra çalışır
     */
    @AfterReturning(pointcut = "execution(* com.pavza.assets.controller.*.*(..))", returning = "result")
    public void logAfterController(JoinPoint joinPoint, Object result) {
        logger.info("✓ Completed: {}", joinPoint.getSignature().toShortString());
        logger.info("✓ Response: {}", result != null ? result.getClass().getSimpleName() : "null");
        logger.info("═══════════════════════════════════════════");
    }
    
    /**
     * Exception durumunda çalışır
     */
    @AfterThrowing(pointcut = "execution(* com.pavza.assets.controller.*.*(..))", throwing = "error")
    public void logAfterThrowing(JoinPoint joinPoint, Throwable error) {
        logger.error("✗ Exception in: {}", joinPoint.getSignature().toShortString());
        logger.error("✗ Error: {}", error.getMessage());
        logger.info("═══════════════════════════════════════════");
    }
    
    /**
     * Service methodları için loglama
     */
    @Before("execution(* com.pavza.assets.service.*.*(..))")
    public void logBeforeService(JoinPoint joinPoint) {
        logger.debug("→ Service call: {}", joinPoint.getSignature().toShortString());
    }
}