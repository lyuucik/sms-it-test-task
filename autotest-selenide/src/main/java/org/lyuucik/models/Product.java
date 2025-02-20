package org.lyuucik.models;

public record Product(
        String name,
        Double price,
        Double discountPrice
) {}
