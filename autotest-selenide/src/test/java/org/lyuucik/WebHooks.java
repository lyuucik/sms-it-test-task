package org.lyuucik;

import com.codeborne.selenide.Configuration;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.openqa.selenium.PageLoadStrategy;

import static com.codeborne.selenide.Selenide.closeWebDriver;
import static com.codeborne.selenide.Selenide.open;
import static com.codeborne.selenide.WebDriverRunner.getWebDriver;


public abstract class WebHooks {
    @BeforeEach
    void setup() {
        Configuration.browser = "chrome";
        Configuration.timeout = 10000;
        Configuration.pageLoadStrategy = PageLoadStrategy.EAGER.toString();
        open();
        getWebDriver().manage().window().maximize();
    }

    @AfterEach
    void tearDown() {
        closeWebDriver();
    }
}
