package ptithcm.tttn.controller.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ptithcm.tttn.entity.Brand;
import ptithcm.tttn.response.ListEntityResponse;
import ptithcm.tttn.service.BrandService;

import java.util.List;

@RestController
@RequestMapping("/api/user/brand")
public class BrandController {
    private final BrandService brandService;

    public BrandController(BrandService brandService) {
        this.brandService = brandService;
    }

    @GetMapping("/all")
    public ResponseEntity<ListEntityResponse> findAllBrand(@RequestHeader("Authorization") String jwt){
        ListEntityResponse res = new ListEntityResponse();
        HttpStatus httpStatus = HttpStatus.CONFLICT;
        try{
            List<Brand> listBrand = brandService.findAll();
            res.setData(listBrand);
            res.setMessage("Success");
            res.setStatus(HttpStatus.OK);
            res.setCode(HttpStatus.OK.value());
            httpStatus = HttpStatus.OK;
        }catch (Exception e){
            res.setStatus(HttpStatus.CONFLICT);
            res.setCode(HttpStatus.CONFLICT.value());
            res.setMessage("erorr " + e.getMessage());
            res.setData(null);
        }
        return new ResponseEntity<>(res,httpStatus);
    }
}
