package ptithcm.tttn.controller.staff;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ptithcm.tttn.entity.Brand;
import ptithcm.tttn.entity.Category;
import ptithcm.tttn.response.EntityResponse;
import ptithcm.tttn.response.ListEntityResponse;
import ptithcm.tttn.service.BrandService;

import java.util.List;

@RestController
@RequestMapping("/api/staff/brand")
public class StaffBrandController {

    private final BrandService brandService;

    public StaffBrandController(BrandService brandService) {
        this.brandService = brandService;
    }

    @PostMapping("/add")
    public ResponseEntity<EntityResponse> addBrandByManager(@RequestBody Brand brand, @RequestHeader("Authorization") String jwt) throws Exception {
        EntityResponse res = new EntityResponse();
        HttpStatus httpStatus = HttpStatus.CONFLICT;
        try{
            Brand saveBrand = brandService.createBrand(brand,jwt);
            res.setData(saveBrand);
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

    @PutMapping("/{id}/update")
    public ResponseEntity<EntityResponse> updatedBrandByStaff(@RequestBody Brand brand, @RequestHeader("Authorization") String jwt,@PathVariable Long id) throws Exception{
        EntityResponse res = new EntityResponse();
        HttpStatus httpStatus = HttpStatus.CONFLICT;
        try{
            Brand saveBrand = brandService.updateBrand(id,brand,jwt);
            res.setData(saveBrand);
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

    @GetMapping("/find")
    public ResponseEntity<EntityResponse> findBrandByName(@RequestParam String name,@RequestHeader("Authorization") String jwt) throws Exception {
        EntityResponse res = new EntityResponse();
        Brand brand = brandService.findByBrandName(name);
        HttpStatus httpStatus = HttpStatus.CONFLICT;
        res.setData(brand);
        res.setMessage("Success");
        res.setStatus(HttpStatus.CREATED);
        res.setCode(HttpStatus.CREATED.value());
        httpStatus = HttpStatus.CREATED;
        return new ResponseEntity<>(res,httpStatus);
    }

}
