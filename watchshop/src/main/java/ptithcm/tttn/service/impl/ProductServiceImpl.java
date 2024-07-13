package ptithcm.tttn.service.impl;

import org.springframework.stereotype.Service;
import ptithcm.tttn.entity.Product;
import ptithcm.tttn.repository.ProductRepo;
import ptithcm.tttn.service.ProductService;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepo productRepo;

    public ProductServiceImpl(ProductRepo productRepo) {
        this.productRepo = productRepo;
    }

    @Override
    public List<Product> findAll() {
        return productRepo.findAll();
    }

    @Override
    public Product findByName(String name) {
        Product find = productRepo.findByName(name);
        
    }

    @Override
    public Product findById(Long id) {
        return null;
    }

    @Override
    public List<Product> findByDetail(String desc) {
        return List.of();
    }

    @Override
    public List<Product> findByCategoryName(String name) {
        return List.of();
    }

    @Override
    public List<Product> findByBrandName(String name) {
        return List.of();
    }
}
