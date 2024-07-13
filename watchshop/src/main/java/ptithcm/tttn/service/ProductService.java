package ptithcm.tttn.service;

import ptithcm.tttn.entity.Product;

import java.util.List;

public interface ProductService {
    List<Product> findAll();

    Product findByName(String name);

    Product findById(Long id);

    List<Product> findByDetail(String desc);

    List<Product> findByCategoryName(String name);

    List<Product> findByBrandName(String name);
}
