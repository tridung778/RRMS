package com.rrms.rrms.services;

import java.util.List;
import java.util.UUID;

import com.rrms.rrms.dto.response.MotelResponse;
import com.rrms.rrms.models.Motel;

public interface IMotelService {
    public MotelResponse insert(Motel motel);

    public MotelResponse findById(UUID id);

    public List<MotelResponse> findAll();

    public MotelResponse update(UUID id, Motel motel);

    public void delete(UUID id);
}
