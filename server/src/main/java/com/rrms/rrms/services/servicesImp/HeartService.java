package com.rrms.rrms.services.servicesImp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rrms.rrms.dto.request.AccountRequest;
import com.rrms.rrms.dto.response.AccountResponse;
import com.rrms.rrms.dto.response.BulletinBoardResponse;
import com.rrms.rrms.dto.response.HeartResponse;
import com.rrms.rrms.mapper.HeartMapper;
import com.rrms.rrms.models.BulletinBoard;
import com.rrms.rrms.models.Heart;
import com.rrms.rrms.repositories.BulletinBoardRepository;
import com.rrms.rrms.repositories.HeartRepository;
import com.rrms.rrms.services.IHeartService;

@Service
public class HeartService implements IHeartService {
    @Autowired
    private HeartRepository heartRepository;

    @Autowired
    private BulletinBoardRepository bulletinBoardRepository;

    @Autowired
    private HeartMapper heartMapper;

    @Override
    public HeartResponse getHeartByAccount(AccountRequest accountRequest) {
        Heart find = heartRepository.findHeartByAccount_Username(accountRequest.getUsername());
        if (find != null) {
            return heartMapper.heartToHeartResponse(find);
        } else {
            return null;
        }
    }

    @Override
    public HeartResponse addHeart(AccountResponse accountResponse, BulletinBoardResponse bulletinBoardResponse) {
        Heart find = heartRepository.findHeartByAccount_Username(accountResponse.getUsername());
        BulletinBoard room = bulletinBoardRepository.getOne(bulletinBoardResponse.getBulletinBoardId());
        if (find != null && room != null) {
            if (!find.getRooms().contains(room)) {
                find.getRooms().add(room);
                heartRepository.save(find);
                return heartMapper.heartToHeartResponse(find);
            }
        }
        return null;
    }

    @Override
    public HeartResponse removeHeart(AccountResponse accountResponse, BulletinBoardResponse bulletinBoardResponse) {
        Heart find = heartRepository.findHeartByAccount_Username(accountResponse.getUsername());
        BulletinBoard room = bulletinBoardRepository.getOne(bulletinBoardResponse.getBulletinBoardId());
        if (find != null && room != null) {
            if (find.getRooms().contains(room)) {
                find.getRooms().remove(room);
                heartRepository.save(find);
                return heartMapper.heartToHeartResponse(find);
            }
        }
        return null;
    }
}
