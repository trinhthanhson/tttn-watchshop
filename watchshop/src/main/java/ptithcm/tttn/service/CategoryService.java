package ptithcm.tttn.service;

import ptithcm.tttn.entity.Category;

import java.util.List;

public interface CategoryService {
    Category createCategory(Category category, String jwt) throws Exception;

    List<Category> findAll();

    Category updateCategory(Long id, Category category, String jwt) throws Exception;

    Category findById(Long id) throws Exception;

    Category findCategoryByName(String name) throws Exception;
}
