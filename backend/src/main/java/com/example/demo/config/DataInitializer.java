package com.example.demo.config;

import com.example.demo.model.Message;
import com.example.demo.model.Model3D;
import com.example.demo.model.Review;
import com.example.demo.model.User;
import com.example.demo.model.WorkFolder;
import com.example.demo.repository.MessageRepository;
import com.example.demo.repository.Model3DRepository;
import com.example.demo.repository.ReviewRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.WorkFolderRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(
            Model3DRepository modelRepository,
            WorkFolderRepository folderRepository,
            MessageRepository messageRepository,
            ReviewRepository reviewRepository,
            UserRepository userRepository
    ) {
        return args -> {
            // Usuarios del sistema
            if (userRepository.count() == 0) {
                User u1 = User.builder()
                        .username("oliver_saldivar")
                        .email("oliver@3dmarket.com")
                        .password("123456")
                        .role("ROLE_CREATOR")
                        .bio("Modelador 3D y Artista de Mallas PBR para entornos Sci-Fi y Cinematografía.")
                        .build();

                User u2 = User.builder()
                        .username("cristian_berumen")
                        .email("cristian@3dmarket.com")
                        .password("123456")
                        .role("ROLE_CREATOR")
                        .bio("Especialista en accesorios tácticos militares y optimización Low-Poly.")
                        .build();

                User u3 = User.builder()
                        .username("carlos_gamedev")
                        .email("carlos@gamestudio.com")
                        .password("123456")
                        .role("ROLE_CLIENT")
                        .bio("Desarrollador líder en PixelCraft Studios.")
                        .build();

                userRepository.saveAll(List.of(u1, u2, u3));
            }

            // Modelos 3D
            if (modelRepository.count() == 0) {
                Model3D m1 = Model3D.builder()
                        .title("Astronauta Espacial Explorador")
                        .description("Modelo 3D detallado de un traje espacial con materiales PBR reflectantes, visor dorado y mapa de normales para simulación espacial.")
                        .category("Personajes")
                        .polygonCount(28500)
                        .vertexCount(15200)
                        .price(29.99)
                        .isRigged(true)
                        .isAnimated(true)
                        .hasPbr(true)
                        .fileUrl("/models/Astronaut.glb")
                        .thumbnailUrl("/models/Astronaut.glb")
                        .creatorName("Oliver Saldívar")
                        .licenseType("Comercial Standard")
                        .createdAt(LocalDateTime.now())
                        .build();

                Model3D m2 = Model3D.builder()
                        .title("Casco de Vuelo Militar Táctico")
                        .description("Casco de combate táctico militar con acabado metálico PBR, visor reflectante y mapa de rugosidad en resolución 2K.")
                        .category("Props")
                        .polygonCount(19400)
                        .vertexCount(10150)
                        .price(14.50)
                        .isRigged(false)
                        .isAnimated(false)
                        .hasPbr(true)
                        .fileUrl("/models/DamagedHelmet.glb")
                        .thumbnailUrl("/models/DamagedHelmet.glb")
                        .creatorName("Cristian Berumen")
                        .licenseType("Comercial Extended")
                        .createdAt(LocalDateTime.now().minusDays(1))
                        .build();

                Model3D m3 = Model3D.builder()
                        .title("Vehículo Deportivo ToyCar")
                        .description("Auto deportivo de competición estilizado con carrocería aerodinámica y detalles de textura.")
                        .category("Vehículos")
                        .polygonCount(12450)
                        .vertexCount(7800)
                        .price(0.0) // Gratuito
                        .isRigged(false)
                        .isAnimated(false)
                        .hasPbr(true)
                        .fileUrl("/models/ToyCar.glb")
                        .thumbnailUrl("/models/ToyCar.glb")
                        .creatorName("3DMarket Studio")
                        .licenseType("CC0 (Dominio Público)")
                        .createdAt(LocalDateTime.now().minusDays(3))
                        .build();

                Model3D m4 = Model3D.builder()
                        .title("Silla Contemporánea de Diseño")
                        .description("Mueble contemporáneo con acabados de tela aterciopelada y estructura ergonómica para renderizado de interiores.")
                        .category("Arquitectura")
                        .polygonCount(8900)
                        .vertexCount(4600)
                        .price(9.99)
                        .isRigged(false)
                        .isAnimated(false)
                        .hasPbr(true)
                        .fileUrl("/models/SheenChair.glb")
                        .thumbnailUrl("/models/SheenChair.glb")
                        .creatorName("Oliver Saldívar")
                        .licenseType("Comercial Standard")
                        .createdAt(LocalDateTime.now().minusDays(4))
                        .build();

                Model3D m5 = Model3D.builder()
                        .title("Robot Centinela Animado")
                        .description("Robot bípedo con ciclos de animación de marcha (walk) y alerta (idle). Preparado para motores Unity y Unreal Engine.")
                        .category("Personajes")
                        .polygonCount(32100)
                        .vertexCount(18400)
                        .price(39.00)
                        .isRigged(true)
                        .isAnimated(true)
                        .hasPbr(true)
                        .fileUrl("/models/RobotExpressive.glb")
                        .thumbnailUrl("/models/RobotExpressive.glb")
                        .creatorName("CyberForge 3D")
                        .licenseType("Comercial Extended")
                        .createdAt(LocalDateTime.now().minusDays(5))
                        .build();

                List<Model3D> savedModels = modelRepository.saveAll(List.of(m1, m2, m3, m4, m5));

                // Folders de Trabajo
                WorkFolder f1 = WorkFolder.builder()
                        .name("Colección Sci-Fi & Espacio")
                        .description("Activos diseñados para entornos de ciencia ficción, estaciones espaciales y trajes de exploración.")
                        .creatorName("Oliver Saldívar")
                        .coverImageUrl("https://modelviewer.dev/shared-assets/models/Astronaut.glb")
                        .models(new ArrayList<>(List.of(savedModels.get(0), savedModels.get(4))))
                        .build();

                WorkFolder f2 = WorkFolder.builder()
                        .name("Props y Arquitectura Interior")
                        .description("Mobiliario y piezas de utilería optimizadas para escenas de arquitectura y videojuegos contemporáneos.")
                        .creatorName("Oliver Saldívar")
                        .coverImageUrl("https://modelviewer.dev/shared-assets/models/Chair.glb")
                        .models(new ArrayList<>(List.of(savedModels.get(3))))
                        .build();

                folderRepository.saveAll(List.of(f1, f2));

                // Mensajes Cliente-Creador
                Message msg1 = Message.builder()
                        .senderName("Carlos (Cliente)")
                        .receiverName("Oliver Saldívar")
                        .content("¡Hola Oliver! Me interesa el modelo del Astronauta Espacial. ¿Sería posible adaptarle una variación con casco iluminado por emisores LED?")
                        .relatedModelId(savedModels.get(0).getId())
                        .relatedModelTitle(savedModels.get(0).getTitle())
                        .sentAt(LocalDateTime.now().minusHours(3))
                        .isRead(false)
                        .build();

                Message msg2 = Message.builder()
                        .senderName("Oliver Saldívar")
                        .receiverName("Carlos (Cliente)")
                        .content("Hola Carlos, claro que sí. Puedo prepararte el mapa de emisión (Emissive Map) en 2K y dejar el canal listo en el material PBR por un suplemento mínimo.")
                        .relatedModelId(savedModels.get(0).getId())
                        .relatedModelTitle(savedModels.get(0).getTitle())
                        .sentAt(LocalDateTime.now().minusHours(2))
                        .isRead(true)
                        .build();

                messageRepository.saveAll(List.of(msg1, msg2));

                // Reseñas y Calificaciones Técnicas (HU-25)
                Review r1 = Review.builder()
                        .modelId(savedModels.get(0).getId())
                        .authorName("GameDev_Studio99")
                        .rating(5)
                        .comment("Increíble topología. Cero polígonos no-maniforld y el unwrap UV está perfectamente optimizado para Unity.")
                        .createdAt(LocalDateTime.now().minusDays(2))
                        .build();

                Review r2 = Review.builder()
                        .modelId(savedModels.get(0).getId())
                        .authorName("VR_Architect")
                        .rating(5)
                        .comment("Los materiales PBR reaccionan de manera ultra realista a la iluminación dinámica. 100% recomendado.")
                        .createdAt(LocalDateTime.now().minusDays(1))
                        .build();

                Review r3 = Review.builder()
                        .modelId(savedModels.get(1).getId())
                        .authorName("SimTactical")
                        .rating(5)
                        .comment("Excelente nivel de detalle en el casco. Texturas metálicas nítidas en 2K.")
                        .createdAt(LocalDateTime.now().minusHours(12))
                        .build();

                reviewRepository.saveAll(List.of(r1, r2, r3));

                System.out.println(">>> 3DMarket: Base de datos precargada con Modelos, Folders, Mensajes, Usuarios y Reseñas.");
            }
        };
    }
}
