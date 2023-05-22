import { renderElement } from '@t1d333/pickpinlib';
import { connectChatWs, onNewMsg, onSendMsg } from '../public/actions/chat';
import { ChatPage } from '../public/components/ChatPage/ChatPage';
import { store } from '../public/store/store';
import WS from 'jest-websocket-mock';

describe('connectChatWs', () => {
    afterEach(() => {
        // Очистка мок-сервера WebSocket после каждого теста
        WS.clean();
    });

    it('should dispatch connectChatWs action with wsConnection payload', () => {
        const server = new WS('ws://localhost:1234');

        const mockSocket = new WebSocket('ws://localhost:1234');

        const dispatchSpy = jest.spyOn(store, 'dispatch');

        connectChatWs(mockSocket);

        // Проверка вызова dispatch с правильными аргументами
        expect(dispatchSpy).toHaveBeenCalledWith({
            type: 'connectChatWs',
            payload: { wsConnection: mockSocket },
        });
    });
});

describe('ChatPage', () => {
    afterEach(() => {
        // Очистка мок-сервера WebSocket после каждого теста
        WS.clean();
    });

    it('should send a message when onSendMsg is called with non-empty input', () => {
        const server = new WS('ws://localhost:1234');
        const mockSocket = new WebSocket('ws://localhost:1234');

        const sendSpy = jest.spyOn(mockSocket, 'send');

        connectChatWs(mockSocket);

        const input = {
            value: 'Hello, world!',
        };
        onSendMsg(input);

        expect(sendSpy).toHaveBeenCalledWith(JSON.stringify({ text: 'Hello, world!' }));
        expect(input.value).toBe('');
    });

    it('should do nothing if input value is empty', () => {
        const server = new WS('ws://localhost:1234');
        const mockSocket = new WebSocket('ws://localhost:1234');

        const sendSpy = jest.spyOn(mockSocket, 'send');

        connectChatWs(mockSocket);

        const input = {
            value: '',
        };
        onSendMsg(input);

        expect(sendSpy).not.toHaveBeenCalled();
        expect(input.value).toBe('');
    });
});

describe('onNewMsg', () => {
  it('should return null if the type is not "newMessage"', () => {
    // Задаем состояние хранилища Redux
    store.getState = jest.fn().mockReturnValue({
      type: 'someOtherType',
    });

    // Запускаем функцию onNewMsg
    const result = onNewMsg();

    // Проверяем, что результат равен null
    expect(result).toBeUndefined();
  });

  it('should return null if the author_id does not match', () => {
    // Задаем состояние хранилища Redux
    store.getState = jest.fn().mockReturnValue({
      type: 'newMessage',
      message: {
        author_id: 123,
      },
      user: {
        id: 456,
      },
    });

    // Запускаем функцию onNewMsg
    const result = onNewMsg();

    // Проверяем, что результат равен null
    expect(result).toBeUndefined();
  });

  it('should return the message if the conditions are met', () => {
    // Задаем состояние хранилища Redux
    store.getState = jest.fn().mockReturnValue({
      type: 'newMessage',
      message: {
        author_id: 123,
      },
      user: {
        id: 123,
      },
    });

    // Запускаем функцию onNewMsg
    const result = onNewMsg();

    // Проверяем, что результат равен ожидаемому сообщению
    expect(result).toEqual({
      author_id: 123,
    });
  });
});

