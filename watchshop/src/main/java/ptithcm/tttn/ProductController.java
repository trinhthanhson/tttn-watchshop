package ptithcm.tttn;

import com.google.api.Http;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ptithcm.tttn.entity.Product;
import ptithcm.tttn.response.EntityResponse;
import ptithcm.tttn.response.ListEntityResponse;
import ptithcm.tttn.service.ProductService;

import java.util.List;

@RestController
@RequestMapping("/api/product")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/{id}/info")
    public ResponseEntity<EntityResponse> getInfoProduct(@PathVariable String id){
        EntityResponse res = new EntityResponse();
        try{
            Product product = productService.findById(id);
            res.setCode(HttpStatus.OK.value());
            res.setMessage("Success");
            res.setStatus(HttpStatus.OK);
            res.setData(product);
        }catch (Exception e){
            res.setCode(HttpStatus.OK.value());
            res.setMessage("Fail " + e.getMessage());
            res.setStatus(HttpStatus.CONFLICT);
            res.setData(null);
        }
        return new ResponseEntity<>(res,res.getStatus());
    }

    @GetMapping("/all")
    public ResponseEntity<ListEntityResponse> getAllProduct(){
        ListEntityResponse res = new ListEntityResponse();
        try{
            List<Product> product = productService.findAll();
            res.setCode(HttpStatus.OK.value());
            res.setMessage("Success");
            res.setStatus(HttpStatus.OK);
            res.setData(product);
        }catch (Exception e){
            res.setCode(HttpStatus.OK.value());
            res.setMessage("Fail " + e.getMessage());
            res.setStatus(HttpStatus.CONFLICT);
            res.setData(null);
        }
        return new ResponseEntity<>(res,res.getStatus());
    }
}
