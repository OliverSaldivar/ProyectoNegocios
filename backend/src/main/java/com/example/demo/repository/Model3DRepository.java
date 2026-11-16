package com.example.demo.repository;

import com.example.demo.model.Model3D;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Model3DRepository extends JpaRepository<Model3D, Long> {

    List<Model3D> findByCategoryIgnoreCase(String category);

    @Query("SELECT m FROM Model3D m WHERE " +
           "(:query IS NULL OR LOWER(m.title) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(m.description) LIKE LOWER(CONCAT('%', :query, '%'))) AND " +
           "(:category IS NULL OR LOWER(m.category) = LOWER(:category)) AND " +
           "(:maxPolygons IS NULL OR m.polygonCount <= :maxPolygons)")
    List<Model3D> searchModels(
            @Param("query") String query,
            @Param("category") String category,
            @Param("maxPolygons") Integer maxPolygons
    );
}
