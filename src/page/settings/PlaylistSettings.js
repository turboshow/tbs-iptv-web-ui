import { Button, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';

function PlaylistSettings() {
  const { t } = useTranslation();
  const props = {
    name: 'playlist',
    action: '/api/settings/playlist',
    showUploadList: false,
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(t('playlist.success'));
      } else if (info.file.status === 'error') {
        message.error(t('playlist.error'));
      }
    },
  };

  return (
    <div style={{ padding: '20px' }}>
      <Upload {...props}>
        <Button>
          <UploadOutlined />{t('playlist.importButtonMessage')}
        </Button>
      </Upload>
    </div>
  );
}

export default PlaylistSettings;