package ptithcm.tttn.controller.staff;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ptithcm.tttn.entity.Category;
import ptithcm.tttn.response.EntityResponse;
import ptithcm.tttn.response.ListEntityResponse;
import ptithcm.tttn.service.CategoryService;

import java.util.List;

@RestController
@RequestMapping("/api/staff/category")
public class StaffCategoryController {

    private final CategoryService categoryService;

    public StaffCategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping("/add")
    public ResponseEntity<EntityResponse> addCategoryByStaff(@RequestBody Category category, @RequestHeader("Authorization") String jwt){
        EntityResponse res = new EntityResponse();
        HttpStatus httpStatus = HttpStatus.CONFLICT;
        try{
            Category saveCategory = categoryService.createCategory(category,jwt);
            res.setData(saveCategory);
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
    public ResponseEntity<ListEntityResponse> findAllCategory(@RequestHeader("Authorization") String jwt){
        ListEntityResponse res = new ListEntityResponse();
        HttpStatus httpStatus = HttpStatus.CONFLICT;
        try{
            List<Category> categoryList = categoryService.findAll();
            res.setData(categoryList);
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
    public ResponseEntity<EntityResponse> updatedCategoryByStaff(@RequestBody Category category, @RequestHeader("Authorization") String jwt,@PathVariable Long id) throws Exception{
        EntityResponse res = new EntityResponse();
        HttpStatus httpStatus = HttpStatus.CONFLICT;
        try{
            Category saveCategory = categoryService.updateCategory(id,category,jwt);
            res.setData(category);
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
    public ResponseEntity<EntityResponse> findCategoryByName(@RequestParam String name,@RequestHeader("Authorization") String jwt) throws Exception {
        EntityResponse res = new EntityResponse();
        Category category = categoryService.findCategoryByName(name);
        HttpStatus httpStatus = HttpStatus.CONFLICT;
        res.setData(category);
        res.setMessage("Success");
        res.setStatus(HttpStatus.CREATED);
        res.setCode(HttpStatus.CREATED.value());
        httpStatus = HttpStatus.CREATED;
        return new ResponseEntity<>(res,httpStatus);
    }
}
