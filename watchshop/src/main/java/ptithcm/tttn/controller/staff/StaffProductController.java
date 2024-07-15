package ptithcm.tttn.controller.staff;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ptithcm.tttn.entity.Category;
import ptithcm.tttn.entity.PriceUpdateDetail;
import ptithcm.tttn.entity.Product;
import ptithcm.tttn.request.ProductRequest;
import ptithcm.tttn.response.EntityResponse;
import ptithcm.tttn.service.PriceUpdateDetailService;
import ptithcm.tttn.service.ProductService;

@RestController
@RequestMapping("/api/staff/product")
public class StaffProductController {

    private final ProductService productService;
    private final PriceUpdateDetailService priceUpdateDetailService;

    public StaffProductController(ProductService productService, PriceUpdateDetailService priceUpdateDetailService) {
        this.productService = productService;
        this.priceUpdateDetailService = priceUpdateDetailService;
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

    @PutMapping("/{id}/update")
    public ResponseEntity<EntityResponse> updateProductByStaff(@RequestBody ProductRequest rq , @RequestHeader("Authorization") String jwt,@PathVariable String id){
        EntityResponse res = new EntityResponse();
        HttpStatus httpStatus = HttpStatus.CONFLICT;
        try{
            Product saveProduct = productService.updateProduct(id,rq,jwt);
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

    @PutMapping("/{id}/update/price")
    public ResponseEntity<EntityResponse> updatePriceProductByStaff(@RequestBody PriceUpdateDetail rq , @RequestHeader("Authorization") String jwt, @PathVariable String id){
        EntityResponse res = new EntityResponse();
        HttpStatus httpStatus = HttpStatus.CONFLICT;
        try{
            PriceUpdateDetail savePrice = priceUpdateDetailService.updatePriceProduct(id,rq,jwt);
            res.setData(savePrice);
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
