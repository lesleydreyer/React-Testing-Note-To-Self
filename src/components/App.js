import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import Note from './Note';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';

const cookie_key = 'NOTES';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            text: '',
            notes: []
        }
    }
    componentDidMount() {
        //with cookie if you refresh browser you'll still see the notes that we're locally stored with cookie
        this.setState({ notes: read_cookie(cookie_key) });
    }
    submit() {
        const { notes, text } = this.state;
        notes.push({ text });
        this.setState({ notes });
        bake_cookie(cookie_key, this.state.notes);
    }
    clear() {
        delete_cookie(cookie_key);
        this.setState({ notes: [] });
    }
    render() {
        return (
            <div>
                <h2>Note to Self</h2>
                <Form inline>
                    <FormControl onChange={event => { this.setState({ text: event.target.value }) }} />
                    {<div>&nbsp;&nbsp;&nbsp;</div>}
                    <Button onClick={() => this.submit()}>Submit</Button>
                </Form>
                {
                    this.state.notes.map((note, index) => {
                        return <Note key={index} note={note} />
                    })
                }
                <hr /><Button onClick={() => { this.clear(); }}>Clear Notes</Button>
                {//if no notes to clear cookie hide clear button with ternary operator
                /*removed this to follow along with testing part of tutorial
                    this.state.notes.length > 0
                        ?
                        <Button onClick={() => { this.clear(); }}>ClearNotes</Button>
                        :
                <div></div>
                */}
            </div>
        )
    }
}

export default App;