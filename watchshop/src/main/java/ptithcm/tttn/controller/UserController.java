package ptithcm.tttn.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ptithcm.tttn.entity.Product;
import ptithcm.tttn.repository.ProductRepo;

import java.util.List;

@RestController
@RequestMapping("/test")
public class UserController {
    private final ProductRepo productRepo;

    public UserController(ProductRepo productRepo) {
        this.productRepo = productRepo;
    }
    @GetMapping
    public ResponseEntity get(){
        String p = generateNewProductId();
         return new ResponseEntity(p, HttpStatus.HTTP_VERSION_NOT_SUPPORTED);
    }
    private String generateNewProductId() {

        List<Product> products = productRepo.findAll();
        int maxId = 0;
        for (Product p : products) {
            String idStr = p.getProduct_id().substring(2);  // Remove "DH" prefix
            int id = Integer.parseInt(idStr);
            if (id > maxId) {
                maxId = id;
            }
        }
        return String.format("DH%08d", maxId + 1);
    }
}
