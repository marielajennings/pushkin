import psycopg2
import os


def queryDbMain(ch, sql):
    ch.queue_declare(queue=os.environ['LOGGER_QUEUE'])

    ch.basic_publish(exchange='',
            routing_key=os.environ['LOGGER_QUEUE'],
            body=sql)




#########################################################################
# all methods below are rpc-used methods
# and must return a jsonizable object
#########################################################################

def health(ch, method, props, data):
    ch.basic_publish(exchange = '',
            routing_key = props.reply_to,
            properties = pika.BasicProperties(correlation_id=props.correlation_id),
            body = responseJSON
            )

    ch.basic_ack(delivery_tag = method.delivery_tag)

    return { 'message': 'very healthy' }

def totalQuestionResponses(ch, method, props, data):
    ch.basic_publish(exchange = '',
            routing_key = props.reply_to,
            properties = pika.BasicProperties(correlation_id=props.correlation_id),
            body = responseJSON
            )

    ch.basic_ack(delivery_tag = method.delivery_tag)

    return queryDbMain(ch, 'SELECT COUNT(*) FROM "${QUIZ_NAME}_stimuli"')

#########################################################################
# map all api methods requested via the controller to functions
# to be called from the main worker file
#
# using a mapping allows for helper functions to be used
# that aren't directly accessible through the api
#########################################################################

methods = {
        "health": health,
        "totalQuestionsAnswered": totalQuestionResponses,
        "userQuestionsAnswered": userQuestionResponses,
        }


#########################################################################
# not yet implemented
# see the api controller for the methods that are expected
#########################################################################

# totalQuestionsAnswered

# topTen
# params: [ ` SELECT "${QUIZ_NAME}_stimulusResponses".user_id, COUNT("${QUIZ_NAME}_stimulusResponses".user_id) FROM "${QUIZ_NAME}_stimulusResponses" GROUP BY "${QUIZ_NAME}_stimulusResponses".user_id   ` ]

# randomFromUser
"""
					`SELECT "${QUIZ_NAME}_stimuli".id,
									"${QUIZ_NAME}_stimuli".stimulus,
									"${QUIZ_NAME}_stimuli".options
					 FROM "${QUIZ_NAME}_stimuli"
					 WHERE "${QUIZ_NAME}_stimuli".stimulus NOT IN (
						 SELECT stimulus from "${QUIZ_NAME}_stimulusResponses" WHERE user_id = ${user_id}
					 )
					 ORDER BY RANDOM()
					 LIMIT 1
					 `
"""

# random
"""
`SELECT * from "${QUIZ_NAME}_stimuli"
 ORDER BY RANDOM()
 LIMIT 1`
"""

# user
#  `SELECT * FROM "${QUIZ_NAME}_users" WHERE "auth0_id" = '${req.params.auth_id}' LIMIT 1`



