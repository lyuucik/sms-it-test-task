package org.lyuucik.config;


import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.Properties;

public class Config {
    private static final Properties props = new Properties();
    static {
        try (Reader reader = new InputStreamReader(Config.class.getResourceAsStream("/config.properties"), StandardCharsets.UTF_8)) {
            props.load(reader);
        } catch (Exception e) {
            throw new RuntimeException("Error loading config", e);
        }
    }

    public static String getProperty(String name) {
       return props.getProperty(name);
    }
}
