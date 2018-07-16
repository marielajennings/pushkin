import pika
import os
import json
import handleResponse


def fromDbLoggerCallback(ch, method, props, body):
    # db logger responded with something, pass it on to function that called

    # get that function's result and send it back to the api
    response = 'someFunction'

    ch.basic_publish(exchange='',
            routing_key=props.reply_to,
            properties=pika.BasicProperties(correlation_id=props.correlation_id),
            body=response)

    channel.basic_ack(delivery_tag=method.delivery_tag)

def fromApiCallback(ch, method, props, body):
    bodyJSON = json.loads(body)
    rpcParamMethod = bodyJSON['method']
    rpcParamData = bodyJSON['data']

    # send stuff to db, tell it who to reply to, [send back asnwer from db callback]

    # send response back to rabbit

    channel.basic_ack(delivery_tag=method.delivery_tag)


def on_open(connection):
    connection.channel(on_channel_open)

def on_channel_open(channel):
    channel.basic_consume(fromApiCallback, queue='${QUIZ_NAME}_api_queue')
    channel.basic_consume(fromDbLoggerCallback, queue=os.environ['LOGGER_QUEUE'])



def consumeCallback(ch, method, props, body):

    print('method: {}\ndata: {}'.format(rpcParamMethod, rpcParamData))

    handler = handleResponse.methods.get(rpcParamMethod, lamba x: { 'message': 'method not found' })

    response = handler(ch, method, props, rpcParamData)
    responseJSON = json.dumps(response)

    print('response: {}'.format(responseJSON))

    ch.basic_publish(exchange = '',
            routing_key = props.reply_to,
            properties = pika.BasicProperties(correlation_id=props.correlation_id),
            body = responseJSON
            )

    ch.basic_ack(delivery_tag = method.delivery_tag)



def main():
    connParams = pika.URLParameters(rabbitAddress)

    connection = pika.SelectConnection(parameters=connParams,
            on_open_callback=on_open)

    connection.ioloop.start()

os.environ['LOGGER_QUEUE']

    channel.queue_declare(queue=listenOnQueue, durable=True)
    channel.basic_qos(prefetch_count=1)
    
    channel.basic_consume(consumeCallback, queue=listenOnQueue)
    print('consuming')
    channel.start_consuming()

if __name__ == '__main__':
    main()





