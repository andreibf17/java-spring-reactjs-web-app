package com.symw.controller;

import com.symw.entity.Category;
import com.symw.payloads.ApiResponse;
import com.symw.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping("/api/createCategory")
    @ResponseBody
    public Boolean createCategory(
            @RequestParam("category") String category_name,
            @RequestParam("subcategory1") String subcategory_1,
            @RequestParam("subcategory2") String subcategory_2,
            @RequestParam("subcategory3") String subcategory_3,
            @RequestParam("year") int year,
            @RequestParam("month") int month) {

        return categoryService.addCategory(category_name, subcategory_1,
                subcategory_2, subcategory_3, year, month);
    }

    @GetMapping("/api/allCategories")
    @ResponseBody
    public Iterable<Category> getAllCategories() {

        return categoryService.getAllCategories();
    }

    @DeleteMapping("/api/deleteCategory")
    @CrossOrigin
    public ResponseEntity deleteCategory(@RequestBody Category category) {

        if (categoryService.deleteCategory(category)) {
            return ResponseEntity.ok(new ApiResponse(true, "category deleted"));
        } else {
            return ResponseEntity.ok(new ApiResponse(false, "something went wrong"));
        }
    }

//    @DeleteMapping("/api/deleteCategory/{categoryId}")
//    @CrossOrigin
//    public void deleteCategory2(@PathVariable("categoryId") long categoryId) {
//
//        System.out.println(categoryId);
//    }
}
