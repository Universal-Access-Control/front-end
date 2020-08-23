// React
import React, { useState } from 'react';

// Tailwindcss
import tw, { styled } from 'twin.macro';

// React-Modal
import ReactModal from 'react-modal';

// React-Spring
import { config, Transition } from 'react-spring/renderprops';

// React-Icons
import { FiCpu } from 'react-icons/fi';

// Styled-Tools
import { switchProp } from 'styled-tools';

// ===========================================
const Modal = tw(ReactModal)`
  absolute inline-block w-full max-w-xl px-8 py-4
  bg-white rounded-lg focus:outline-none
`;
const Header = tw.h1`flex flex-no-wrap items-center mb-4 text-2xl font-bold`;
const Body = tw.div`flex flex-col`;
const Label = tw.label`my-2 text-gray-700 cursor-pointer select-none`;
const TextInput = tw.input`
  block w-full px-4 py-2 mt-2
  text-gray-800 bg-gray-200 border border-gray-300 rounded
  focus:(outline-none bg-white) disabled:text-gray-500
`;
const CheckBox = tw.input`mr-2 cursor-pointer`;
const Footer = tw.div`flex justify-end mt-4`;
const Button = styled.button`
  ${tw`px-4 py-2 ml-2 text-base rounded`}
  ${switchProp('variant', {
    gray: tw`text-gray-600 hocus:(bg-gray-300 outline-none bg-gray-300)`,
    success: tw`text-gray-100 bg-green-500 hocus:(bg-green-600 outline-none)`,
  })}
`;

const DeviceModal = ({ open, device, onClose, onSubmit }) => {
  const DEFAULT_INFO = device || { deviceId: '', name: '', isActive: true };
  const isAddDevice = !device;
  const [info, setInfo] = useState(DEFAULT_INFO);

  const handleChange = (e) => {
    const { checked, name, value, type } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setInfo((lastInfo) => ({ ...lastInfo, [name]: newValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-underscore-dangle
    const isSuccessfully = await onSubmit({ id: device?._id, ...info });
    if (!device && isSuccessfully) {
      setInfo(DEFAULT_INFO);
    }
  };

  return (
    <Transition
      items={open}
      config={config.stiff}
      from={{ opacity: 0, transform: 'translate(-50%, 0%)', top: '0%', left: '50%' }}
      enter={{ opacity: 1, transform: 'translate(-50%, -50%)', top: '50%', left: '50%' }}
      leave={{ opacity: 0, transform: 'translate(-50%, 0%)', top: '0%', left: '50%' }}
    >
      {(show) =>
        show &&
        (({ opacity, ...styles }) => (
          <Modal
            isOpen
            shouldCloseOnEsc
            shouldCloseOnOverlayClick
            ariaHideApp={false}
            shouldFocusAfterRender={false}
            style={{ overlay: { opacity }, content: { ...styles } }}
            onRequestClose={onClose}
          >
            <form onSubmit={handleSubmit}>
              <Header className="header">
                <FiCpu tw="mr-2" /> {isAddDevice ? 'Add Device' : 'Details of Device'}
              </Header>
              <Body>
                <Label htmlFor="deviceId">
                  Id
                  <TextInput
                    id="deviceId"
                    type="text"
                    name="deviceId"
                    disabled={!isAddDevice}
                    value={info.deviceId}
                    onChange={handleChange}
                  />
                </Label>

                <Label htmlFor="DeviceName">
                  Name
                  <TextInput id="DeviceName" type="text" name="name" onChange={handleChange} value={info.name} />
                </Label>

                <Label htmlFor="DeviceActiveState" tw="self-start">
                  <CheckBox
                    type="checkbox"
                    name="isActive"
                    id="DeviceActiveState"
                    onChange={handleChange}
                    checked={info.isActive}
                  />
                  Active
                </Label>
              </Body>

              <Footer>
                <Button variant="gray" type="button" onClick={onClose}>
                  Cancel
                </Button>
                <Button variant="success" type="submit">
                  {isAddDevice ? 'Add' : 'Update'}
                </Button>
              </Footer>
            </form>
          </Modal>
        ))
      }
    </Transition>
  );
};

export default DeviceModal;
