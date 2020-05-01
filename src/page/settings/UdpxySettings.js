import { Button, Form, Input, message, Radio } from 'antd';
import React, { useEffect, useState } from 'react';
import { fetchUdpxySettings, updateUdpxySettings } from '../../api';
import { useTranslation } from 'react-i18next';

const UdpxySettings = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [formFields, setFormFields] = useState({});
  const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 14 },
  };

  useEffect(() => {
    fetchUdpxySettings().then(settings => {
      form.setFieldsValue({
        enable: settings.addr != null,
        addr: settings.addr
      });
    })
  }, []);

  const handleSubmit = values => {
    updateUdpxySettings({
      addr: (values.enable && values.addr) || null
    }).then(() => message.success(t('udpxy.success')), () => message.error(t('udpxy.error')));
  }

  return (
    <Form form={form} onFinish={handleSubmit} onValuesChange={(changedFields, allFields) => {
      setFormFields(allFields);
    }} {...formItemLayout}>
      <Form.Item label={t('udpxy.enable')} name="enable" rules={[{
        required: true,
        message: t('udpxy.enableErrorMsg')
      }]}>
        <Radio.Group>
          <Radio value={true}>{t('udpxy.yes')}</Radio>
          <Radio value={false}>{t('udpxy.no')}</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label={t('udpxy.address')} name="addr" rules={[{
        required: formFields.enable === true,
        message: t('udpxy.addressErrorMsg')
      }]}>
        <Input placeholder="192.168.1.254:1212" disabled={!formFields.enable} />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 2, offset: 2 }}>
        <Button type="primary" htmlType="submit">
          {t('udpxy.save')}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UdpxySettings;