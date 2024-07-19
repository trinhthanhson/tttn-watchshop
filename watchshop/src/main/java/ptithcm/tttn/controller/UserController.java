package ptithcm.tttn.controller;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ptithcm.tttn.entity.Product;
import ptithcm.tttn.repository.ProductRepo;
import ptithcm.tttn.service.EmailService;

import javax.mail.MessagingException;
import java.util.List;

@RestController
@RequestMapping("/test")
public class UserController {
    private final ProductRepo productRepo;
    private final EmailService senderService;

    public UserController(ProductRepo productRepo, EmailService senderService) {
        this.productRepo = productRepo;
        this.senderService = senderService;
    }


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
