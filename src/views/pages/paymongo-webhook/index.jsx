import React, { useState, useEffect } from 'react'
import { createStructuredSelector } from 'reselect';
import { selectPaymongoWebhook } from './../../../redux/modules/paymongo-webhook/selector';
import * as PAYMONGO_WEBHOOK_API from './../../../services/paymongo-webhook/paymongo.webhook';
import { connect, useDispatch } from 'react-redux';

const WEBHOOK_DEFAULT_PROPS = 
{
    data: {
      id: "",
      type: "webhook",
      attributes: {
        livemode: false,
        secret_key: "",
        status: "enabled",
        url: "",
        events: [],
        created_at: '',
        updated_at: ''
      }
    }
  };
// hook_vhDvMH1gziefKZQjxdUHu4pm
const PaymongoWebhook = ({ PAYMONGO_WEBHOOK }) => 
{
    const dispatch = useDispatch();

    const [ webhook, setWebhook ] = useState(WEBHOOK_DEFAULT_PROPS);

    const onLoadFindWebhookById = async () => 
    {
        try {
            const { data } = await PAYMONGO_WEBHOOK_API.findByIdAsync(process.env.REACT_APP_TEST_PAYMONGO_WEBHOOK_ID);
            setWebhook(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => 
    {
        onLoadFindWebhookById();

        return () => {
            setWebhook(WEBHOOK_DEFAULT_PROPS);
        }
    }, []);

    return (
        <div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    PAYMONGO_WEBHOOK: selectPaymongoWebhook
});

export default connect(mapStateToProps)(PaymongoWebhook)
