import React from 'react';

export default function Board() {
  return (
    <div className="container mt-3">
      <h2>A Jira Clone app built with ReactJS, Ant Design</h2>
      <div className="row mt-5">
        <div className="col-4">
          <img
            style={{ width: '280px', height: '280px', borderRadius: '50%', objectFit: 'cover' }}
            src="https://image.thanhnien.vn/1024/uploaded/thienminh/2017_04_11/anhnoibat_kscn.jpg"
            alt="1"
          />
        </div>
        <div className="col-4">
          <img
            style={{ width: '280px', height: '280px', borderRadius: '50%', objectFit: 'cover' }}
            src="https://kenh14cdn.com/thumb_w/660/2019/4/19/chris12-15556693805521004225700.jpg"
            alt="1"
          />
        </div>
        <div className="col-4">
          <img
            style={{ width: '280px', height: '280px', borderRadius: '50%', objectFit: 'cover' }}
            src="https://marvelvietnam.com/wp-content/uploads/2020/08/Chadwick-Boseman-black-panther-mat-vi-ung-thu-truc-trang.jpg"
            alt="1"
          />
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-4">
          <img
            style={{ width: '280px', height: '280px', borderRadius: '50%', objectFit: 'cover' }}
            src="https://fandom.vn/wp-content/uploads/2019/06/mcu-wanda-maximoff-scarlet-witch-1.jpg"
            alt="1"
          />
        </div>
        <div className="col-4">
          <img
            style={{ width: '280px', height: '280px', borderRadius: '50%', objectFit: 'cover' }}
            src="https://i.pinimg.com/originals/e2/0c/26/e20c260231bc119468aa13ef490d8de8.jpg"
            alt="1"
          />
        </div>
        <div className="col-4">
          <img
            style={{ width: '280px', height: '280px', borderRadius: '50%', objectFit: 'cover' }}
            src="https://cdn.wallpapersafari.com/58/68/MUq3cj.jpg"
            alt="1"
          />
        </div>
      </div>
    </div>
  );
}
