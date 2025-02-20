package org.lyuucik.pages;

import com.codeborne.selenide.Condition;
import com.codeborne.selenide.ElementsCollection;
import com.codeborne.selenide.SelenideElement;
import org.lyuucik.models.Product;
import org.openqa.selenium.By;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static com.codeborne.selenide.Selenide.*;

public class WildberriesMainPage {

    private static final String SEARCH_INPUT_XPATH = "//input[@id='searchInput']";
    private static final String SORT_DROPDOWN_XPATH = "//button[@class='dropdown-filter__btn dropdown-filter__btn--sorter  ']";
    private static final String SORT_BY_PRICE_ASC_XPATH = "//li[@class='filter__item j-catalog-sort']//*[text()='По возрастанию цены']";
    private static final String PRODUCT_LIST_XPATH = "//article[contains(@class, 'product-card')]";
    private static final String PRODUCT_NAME_XPATH = ".//a[@class='product-card__link j-card-link j-open-full-product-card']";
    private static final String PRICE_WRAP_XPATH = ".//*[@class='price__wrap']";
    private static final String PRICE_INS_XPATH = PRICE_WRAP_XPATH + "/ins";
    private static final String PRICE_DEL_XPATH = PRICE_WRAP_XPATH + "/del";
    private static final String CLOUD_SWITCH_XPATH = "//div[@class='dropdown-filter j-show-all-filtres']";

    private final SelenideElement searchInput = $(By.xpath(SEARCH_INPUT_XPATH));
    private final SelenideElement sortDropdown = $(By.xpath(SORT_DROPDOWN_XPATH));
    private final SelenideElement sortByPriceAsc = $(By.xpath(SORT_BY_PRICE_ASC_XPATH));
    private final SelenideElement cloudSwitch = $(By.xpath(CLOUD_SWITCH_XPATH));
    private final ElementsCollection productList = $$(By.xpath(PRODUCT_LIST_XPATH));

    private WildberriesMainPage() {}

    public static WildberriesMainPage openPage() {
        open("https://www.wildberries.ru");
        return new WildberriesMainPage();
    }

    public WildberriesMainPage searchForProduct(String productName) {
        searchInput.shouldBe(Condition.visible).setValue(productName).pressEnter();
        cloudSwitch.shouldBe(Condition.visible);
        return this;
    }

    public WildberriesMainPage sortByPriceAscending() {
        sortDropdown.hover();
        sortByPriceAsc.click();
        return this;
    }

    public List<Product> getProducts(int numberOfProducts) {
        List<Product> products = new ArrayList<>();
        IntStream.range(0, numberOfProducts)
                .forEach(i -> {
                    products.add(mapToProduct($(By.xpath(PRODUCT_LIST_XPATH), i)));
                });
        return products;
    }

    private Product mapToProduct(SelenideElement productElement) {
        String name = productElement.find(By.xpath(PRODUCT_NAME_XPATH)).getAttribute("aria-label");

        Double price = extractPrice(productElement, PRICE_INS_XPATH);
        Double discountPrice = productElement.find(By.xpath(PRICE_DEL_XPATH)).exists()
                ? extractPrice(productElement, PRICE_DEL_XPATH)
                : null;
        if(discountPrice != null) {
          var tmp = price;
          price = discountPrice;
          discountPrice = tmp;
        }

        return new Product(name, price, discountPrice);
    }

    private Double extractPrice(SelenideElement productElement, String xpath) {

        return Double.parseDouble(productElement.find(By.xpath(xpath)).text().split(" ")[0]);
    }
}
