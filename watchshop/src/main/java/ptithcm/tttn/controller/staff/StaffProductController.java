package ptithcm.tttn.controller.staff;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ptithcm.tttn.entity.Category;
import ptithcm.tttn.entity.Product;
import ptithcm.tttn.request.ProductRequest;
import ptithcm.tttn.response.EntityResponse;
import ptithcm.tttn.service.ProductService;

@RestController
@RequestMapping("/api/staff/product")
public class StaffProductController {

    private final ProductService productService;

    public StaffProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/add")
    public ResponseEntity<EntityResponse> addProductByStaff(@RequestBody ProductRequest rq , @RequestHeader("Authorization") String jwt){
        EntityResponse res = new EntityResponse();
        HttpStatus httpStatus = HttpStatus.CONFLICT;
        try{
            Product saveProduct = productService.createProduct(rq,jwt);
            res.setData(saveProduct);
            res.setMessage("Success");
            res.setStatus(HttpStatus.CREATED);
            res.setCode(HttpStatus.CREATED.value());
            httpStatus = HttpStatus.CREATED;
        }catch (Exception e){
            res.setStatus(HttpStatus.CONFLICT);
            res.setCode(HttpStatus.CONFLICT.value());
            res.setMessage("erorr " + e.getMessage());
            res.setData(null);
        }
        return new ResponseEntity<>(res,httpStatus);
    }
}
