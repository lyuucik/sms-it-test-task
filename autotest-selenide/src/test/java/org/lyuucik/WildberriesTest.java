package org.lyuucik;

import org.junit.jupiter.api.Test;
import org.lyuucik.config.Config;
import org.lyuucik.pages.WildberriesMainPage;


public class WildberriesTest extends WebHooks {
    @Test
    void show10Protractors() {
        var searchString = Config.getProperty("wildberries.search_string");
        var numberOfProducts = Integer.parseInt(Config.getProperty("wildberries.number_products"));

        var products = WildberriesMainPage.openPage()
                .searchForProduct(searchString)
                .sortByPriceAscending()
                .getProducts(numberOfProducts);

        assert products.size() == 10;

        products.forEach(System.out::println);
    }
}
