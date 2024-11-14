package com.rrms.rrms.services.servicesImp;

import com.rrms.rrms.dto.request.TenantRequest;
import com.rrms.rrms.dto.response.TenantResponse;
import com.rrms.rrms.mapper.TenantMapper;
import com.rrms.rrms.models.Tenant;
import com.rrms.rrms.repositories.TenantRepository;
import com.rrms.rrms.services.ITenantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TenantService implements ITenantService {
    @Autowired
    private TenantRepository tenantRepository;
    @Autowired
    private TenantMapper tenantMapper;

    @Override
    public TenantResponse insert(TenantRequest tenant) {
        return tenantMapper.toTenantResponse(tenantRepository.save(tenantMapper.tenantRequestToTenant(tenant)));
    }

    @Override
    public TenantResponse findById(UUID id) {
        return tenantRepository
                .findById(id)
                .map(tenant -> {
                    TenantResponse response = tenantMapper.toTenantResponse(tenant);
                    return response;
                })
                .orElseThrow(() -> new IllegalArgumentException("Tenant not found"));
    }


    @Override
    public List<TenantResponse> getAllTenants() {
        return tenantRepository.findAll().stream()
                .map(tenantMapper::toTenantResponse)
                .collect(Collectors.toList());
    }


    @Override
    public TenantResponse update(UUID id, TenantRequest tenantRequest) {
        // Tìm tenant theo id
        Optional<Tenant> tenantFind = tenantRepository.findById(id);
        if (tenantFind.isPresent()) {
            Tenant tenant = tenantFind.get();

            // Cập nhật các trường từ tenantRequest vào tenant hiện có
            tenantMapper.updateTenantFromRequest(tenantRequest, tenant);

            // Lưu bản ghi sau khi cập nhật
            return tenantMapper.toTenantResponse(tenantRepository.save(tenant));
        }
        return null;
    }


    @Override
    public void delete(UUID id) {
        Optional<Tenant> tenant = tenantRepository.findById(id);
        if (tenant.isPresent()) {
            tenantRepository.deleteById(id);
        }
    }





}