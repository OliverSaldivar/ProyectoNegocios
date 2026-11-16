package com.example.demo.repository;

import com.example.demo.model.WorkFolder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkFolderRepository extends JpaRepository<WorkFolder, Long> {
    List<WorkFolder> findByCreatorNameIgnoreCase(String creatorName);
}
