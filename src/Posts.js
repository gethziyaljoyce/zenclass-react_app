import React from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";


const URL = "https://jsonplaceholder.typicode.com/posts";
class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: [],
            userId: "",
            title: "",
            body: "",
            id: "",
            userData: [],
            comments: [],
            information: []
        };
    }
    getData = async () => {
        try {
            const { data } = await axios.get(URL);
            this.setState({ info: data })
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }

    deleteData = async (id) => {
        window.alert("Are you sure?");
        try {
            await axios.delete(`${URL}/${id}`);
            console.log(id);
            var info = [...this.state.info];
            info = info.filter((ele) => ele.id !== id);
            this.setState({ info });

        } catch (err) {
            console.log(err);
        }
    }

    viewData = async (id) => {
        try {
            const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
            console.log(data);
            this.setState({ userData: data });
            console.log(this.state.userData.name);
            if (id > 0) {
                const { data } = await axios.get(`${URL}/${id}`);
                console.log(data);
                this.setState({ information: data });
            }
            if (id > 0) {
                const { data } = await axios.get(`https://jsonplaceholder.typicode.com/comments/?postId=${id}`);
                console.log(data);
                this.setState({ comments: data });
                console.log(this.state.comments);
            }

        } catch (err) {
            console.log(err);
        }
    }


    createData = async () => {
        try {
            var { userId, title, body } = this.state;
            const { data: post } = await axios.post(URL, {
                userId,
                title,
                body,
            });
            const info = [...this.state.info];
            info.push(post);
            this.setState({ info, userId: "", title: "", body: "" });

        } catch (err) {
            console.log(err);
        }
    };

    updateData = async () => {
        try {
            var { id, userId, title, body } = this.state;
            const { data: post } = await axios.put(`${URL}/${id}`, {
                userId,
                title,
                body,
            });
            const info = [...this.state.info];
            const index = info.findIndex((elem) => elem.id === id);
            info[index] = post;
            this.setState({ info, userId: "", title: "", body: "" });
            console.log(post);
        } catch (err) {
            console.log(err);
        }
    }

    componentDidMount() {
        this.getData();
    }

    handleChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.id) {
            this.updateData();
        } else
            this.createData();
    };

    selectDataToUpdate = (element) => {
        console.log(element);
        this.setState({ ...element });
    }
    render() {
        return (
            <>
                <div className="Container">
                    <div className="container_form">
                        <h2 id="add">Adding Data</h2>
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <label><b>User Id  :</b></label>
                                <select
                                    name="userId"
                                    value={this.state.userId}
                                    onChange={this.handleChange} >
                                    <option value="1">Leanne Graham</option>
                                    <option value="2">Ervin Howell</option>
                                    <option value="3">Clementine Bauch</option>
                                    <option value="4">Patricia Lebsack</option>
                                    <option value="5">Chelsey Dietrich</option>
                                    <option value="6">Mrs. Dennis Schulist</option>
                                    <option value="7">Kurtis Weissnat</option>
                                    <option value="8">Nicholas Runolfsdottir V</option>
                                    <option value="9">Glenna Reichert</option>
                                    <option value="10">Clementina DuBuque</option>
                                </select>
                            </div>
                            <br></br>
                            <div>
                                <label><b>Title  :</b> </label>
                                <input type="text"
                                    name="title"
                                    value={this.state.title}
                                    onChange={this.handleChange} />
                            </div>
                            <br></br>
                            <div>
                                <label><b>Body :</b> </label>
                                <input type="text"
                                    name="body"
                                    value={this.state.body}
                                    onChange={this.handleChange} />
                            </div>
                            <br></br>
                            <div>
                                <button type="submit">Submit</button>
                            </div>
                            <br></br>
                        </form>
                    </div>
                    <div className="container_individual">
                        <h3>User Detail</h3>
                        <p>Name : {this.state.userData.name}</p>
                        <p>User Name : {this.state.userData.username}</p>
                        <p>Email : {this.state.userData.email}</p>
                        <p>Phone :{this.state.userData.phone}</p>
                        <p>Website :{this.state.userData.website}</p>
                    </div>
                    <div className="container_individual">
                        <h3>Title:{this.state.information.title}</h3>
                        <p>Body: {this.state.information.body}</p>
                    </div>
                    <div className="container_individual">
                        <h3>Comments</h3>
                        {this.state.comments.map((comment) => {
                            return (
                                <>
                                <div key={comment.postId} className="comment">
                                    <p>Name :{comment.name}</p>
                                    <p>Email Id :{comment.email}</p>
                                    <p>Comment :{comment.body}</p>
                                    </div>
                                </>
                            );
                        })}


                    </div>
                    <h3 id="posts"><b>All Posts</b></h3>
                    <Table responsive striped bordered hover>
                        <thead>
                            <tr>
                                <th>User Id</th>
                                <th>Id</th>
                                <th>Body</th>
                                <th>Title</th>
                                <th>Action I</th>
                                <th>Action II</th>
                                <th>Action III</th>
                            </tr>
                        </thead>
                        {this.state.info.map((el) => {
                            return (
                                <tbody key={el.id}>
                                    <tr>
                                        <td>{el.id}</td>
                                        <td>{el.userId}</td>
                                        <td>{el.title}</td>
                                        <td>{el.body}</td>
                                        <td><Button variant="primary" onClick={() => this.deleteData(el.id)}>Delete</Button></td>
                                        <td><Button variant="danger" onClick={() => this.selectDataToUpdate(el)}>Update</Button></td>
                                        <td><Button variant="primary" onClick={() => this.viewData(el.id)}>View</Button></td>
                                    </tr>
                                </tbody>
                            );
                        })}
                    </Table>
                </div>
            </>
        );
    }
}

export default Posts;
