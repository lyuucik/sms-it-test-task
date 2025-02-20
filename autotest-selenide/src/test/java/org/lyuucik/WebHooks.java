package org.lyuucik;

import com.codeborne.selenide.Configuration;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;

import static com.codeborne.selenide.WebDriverRunner.getWebDriver;


public abstract class WebHooks {
    @BeforeEach
    void setup() {
        Configuration.browser = "chrome";
        Configuration.timeout = 30000;
    }

    @BeforeAll
    static void tearDown() {
        getWebDriver().close();
    }
}
