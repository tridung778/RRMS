package com.rrms.rrms.services.servicesImp;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rrms.rrms.dto.request.MotelRequest;
import com.rrms.rrms.dto.response.MotelResponse;
import com.rrms.rrms.mapper.AccountMapper;
import com.rrms.rrms.mapper.MotelMapper;
import com.rrms.rrms.models.Account;
import com.rrms.rrms.models.Motel;
import com.rrms.rrms.repositories.MotelRepository;
import com.rrms.rrms.services.IMotelService;

@Service
public class MotelService implements IMotelService {
    @Autowired
    private MotelRepository motelRepository;

    @Autowired
    private MotelMapper motelMapper;

    @Autowired
    private AccountMapper accountMapper;

    @Override
    public MotelResponse insert(MotelRequest motel) {
        return motelMapper.motelToMotelResponse(motelRepository.save(motelMapper.motelRequestToMotel(motel)));
    }

    @Transactional
    @Override
    public MotelResponse findById(UUID id) {
        return motelRepository
                .findById(id)
                .map(motel -> {
                    MotelResponse response = motelMapper.motelToMotelResponse(motel);
                    return response;
                })
                .orElseThrow(() -> new IllegalArgumentException("Motel not found"));
    }

    @Override
    public List<MotelResponse> findAllByMotelName(String motelName) {
        return motelRepository.findAllByMotelName(motelName).stream()
                .map(motelMapper::motelToMotelResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<MotelResponse> findMotelByAccount_Username(String username) {
        return motelRepository.findMotelByAccount_Username(username).stream()
                .map(motelMapper::motelToMotelResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<MotelResponse> findAll() {
        return motelRepository.findAll().stream()
                .map(motelMapper::motelToMotelResponse)
                .collect(Collectors.toList());
    }

    @Override
    public MotelResponse update(UUID id, MotelRequest motel) {
        Optional<Motel> motelfind = motelRepository.findById(id);
        if (motelfind.isPresent()) {
            motelfind.get().setMotelName(motel.getMotelName());
            motelfind.get().setArea(motel.getArea());
            motelfind.get().setAveragePrice(motel.getAveragePrice());
            motelfind.get().setAddress(motel.getAddress());
            motelfind.get().setMethodofcreation(motel.getMethodofcreation());
            motelfind.get().setMaxperson(motel.getMaxperson());
            motelfind.get().setInvoicedate(motel.getInvoicedate());
            motelfind.get().setPaymentdeadline(motel.getPaymentdeadline());
            motelfind.get().setAccount(accountMapper.toAccount(motel.getAccount()));
            motelfind.get().setTypeRoom(motel.getTypeRoom());
            return motelMapper.motelToMotelResponse(motelRepository.save(motelfind.get()));
        }
        return null;
    }

    @Override
    public void delete(UUID id) {
        Optional<Motel> motelfind = motelRepository.findById(id);
        if (motelfind.isPresent()) {
            motelRepository.deleteById(id);
        }
    }

    @Override
    public Integer getTotalAreaByUsername(Account username) {
        return motelRepository.findTotalAreaByUsername(username);
    }
}
