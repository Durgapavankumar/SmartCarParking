package com.smartparking.controller;

import com.smartparking.model.ParkingSlot;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/slots")
@CrossOrigin(origins = "*") // Allow frontend access
public class ParkingController {

    // Simple in-memory mock for demo purposes if DB is not connected
    private List<ParkingSlot> slots = new ArrayList<>();

    public ParkingController() {
        slots.add(new ParkingSlot(1L, "A-101", false, "COMPACT", 5.0));
        slots.add(new ParkingSlot(2L, "A-102", true, "REGULAR", 7.0));
        slots.add(new ParkingSlot(3L, "A-103", false, "REGULAR", 7.0));
        slots.add(new ParkingSlot(4L, "B-101", false, "DISABLED", 4.0));
    }

    @GetMapping
    public List<ParkingSlot> getAllSlots() {
        return slots;
    }

    @PostMapping("/{id}/book")
    public ParkingSlot bookSlot(@PathVariable Long id) {
        return slots.stream()
                .filter(s -> s.getId().equals(id))
                .findFirst()
                .map(s -> {
                    s.setOccupied(true);
                    return s;
                })
                .orElse(null);
    }
}
