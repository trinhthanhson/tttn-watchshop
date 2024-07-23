package ptithcm.tttn.service.impl;

import org.springframework.stereotype.Service;
import ptithcm.tttn.entity.Category;
import ptithcm.tttn.entity.Staff;
import ptithcm.tttn.entity.User;
import ptithcm.tttn.repository.CategoryRepo;
import ptithcm.tttn.repository.StaffRepo;
import ptithcm.tttn.service.CategoryService;
import ptithcm.tttn.service.UserService;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService
{
    private final UserService userService;
    private final StaffRepo staffRepo;
    private final CategoryRepo categoryRepo;

    public CategoryServiceImpl(UserService userService, StaffRepo staffRepo, CategoryRepo categoryRepo) {
        this.userService = userService;
        this.staffRepo = staffRepo;
        this.categoryRepo = categoryRepo;
    }

    @Override
    @Transactional
    public Category createCategory(String category_name, String jwt) throws Exception {
        Category create = new Category();
        User user = userService.findUserByJwt(jwt);
        Staff staff = staffRepo.findByUserId(user.getUser_id());
        Category saveCategory = new Category();
        boolean checkExist = checkExitsCategory(category_name);
        if(!checkExist){
            try {
                create.setCreated_at(LocalDateTime.now());
                create.setCreated_by(staff.getStaff_id());
                create.setCategory_name(category_name);
                create.setUpdated_at(LocalDateTime.now());
                create.setUpdated_by(staff.getStaff_id());
                saveCategory = categoryRepo.save(create);
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
        }else{
            throw new Exception("exist category name " + category_name);
        }
        return saveCategory;
    }

    @Override
    public List<Category> findAll() {
        return categoryRepo.findAll();
    }

    @Override
    public Category updateCategory(Long id, Category category, String jwt) throws Exception {
        Category find = findById(id);
        boolean checkExist = checkExitsCategory(category.getCategory_name());
        if(!checkExist){
        try{
            User user = userService.findUserByJwt(jwt);
            Staff staff = staffRepo.findByUserId(user.getUser_id());
            find.setCategory_name(category.getCategory_name());
            find.setUpdated_by(staff.getStaff_id());
            find.setUpdated_at(LocalDateTime.now());
        }catch (Exception e){
            throw new Exception("error " + e.getMessage());
        }
        }else{
            throw new Exception("exist category by name " + category.getCategory_name());
        }
        return find;
    }

    @Override
    public Category findById(Long id) throws Exception {
        Optional<Category> find = categoryRepo.findById(id);
        if(find.isPresent()){
            return find.get();
        }
        throw new Exception("not found category by id " + id);
    }

    @Override
    public Category findCategoryByName(String name) throws Exception {
        Category category = categoryRepo.findCategoryByName(name);
        if(category != null){
            return category;
        }
        throw new Exception("not found category by name " + name);
    }

    @Override
    public boolean checkExitsCategory(String name) {
        Category category = categoryRepo.findCategoryByName(name);
        if(category != null){
            return true;
        }else{
            return false;
        }
    }
}
