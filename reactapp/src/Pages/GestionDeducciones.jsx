import React, { Component } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

export class GestionDeducciones extends Component {
    render() {
        const MySwal = withReactContent(Swal)
        //MySwal.fire({
        //    title: <strong>Deducci&oacute;n Insertada!</strong>,
        //    icon: 'success'
        //});
        return (
            <div className="main_container">
                <div className="container">
                    <div className="row flex-lg-nowrap">

                        <div className="col">
                            <div className="h1 pb-2 mb-4 text-dark border-bottom border-secondary">
                            <br/>
                                Gesti&oacute;n de Tipos de Deducciones
                            </div>

                            <div className="row flex-lg-nowrap">
                                <div className="col mb-3">
                                    <div className="e-panel card">
                                        <div className="card-body">
                                            <div className="card-title">
                                                <h6 className="mr-2">Detalles de tipos de deducciones</h6>
                                            </div>
                                            <div className="e-table">
                                                <div className="table-responsive table-lg mt-3">
                                                    <table className="table table-striped">
                                                        <thead>
                                                            <tr>
                                                                <th className="align-top">
                                                                    <div className="custom-control custom-control-inline custom-checkbox custom-control-nameless m-0">
                                                                        <input type="checkbox" className="custom-control-input" id="all-items" />
                                                                        <label className="custom-control-label" for="all-items"></label>
                                                                    </div>
                                                                </th>
                                                                <th>Photo</th>
                                                                <th className="max-width">Name</th>
                                                                <th className="sortable">Date</th>
                                                                <th> </th>
                                                                <th>Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td className="align-middle">
                                                                    <div className="custom-control custom-control-inline custom-checkbox custom-control-nameless m-0 align-top">
                                                                        <input type="checkbox" className="custom-control-input" id="item-1" />
                                                                        <label className="custom-control-label" for="item-1"></label>
                                                                    </div>
                                                                </td>
                                                                <td className="align-middle text-center">
                                                                    <div className="bg-light d-inline-flex justify-content-center align-items-center align-top itemdiv" ><i className="fa fa-fw fa-photo" ></i></div>
                                                                </td>
                                                                <td className="text-nowrap align-middle">Jssa Jas</td>
                                                                <td className="text-nowrap align-middle"><span>09 Apr 2021</span></td>
                                                                <td className="text-center align-middle"><i className="fa fa-fw text-secondary cursor-pointer fa-toggle-on"></i></td>
                                                                <td className="text-center align-middle">
                                                                    <div className="btn-group align-top">
                                                                        <button className="btn btn-sm btn-outline-secondary badge" type="button" data-toggle="modal" data-target="#user-form-modal">Edit</button>
                                                                        <button className="btn btn-sm btn-outline-secondary badge" type="button"><i className="fa fa-trash"></i></button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="align-middle">
                                                                    <div className="custom-control custom-control-inline custom-checkbox custom-control-nameless m-0 align-top">
                                                                        <input type="checkbox" className="custom-control-input" id="item-2" />
                                                                        <label className="custom-control-label" for="item-2"></label>
                                                                    </div>
                                                                </td>
                                                                <td className="align-middle text-center">
                                                                    <div className="bg-light d-inline-flex justify-content-center align-items-center align-top itemdiv" ><i className="fa fa-fw fa-photo" ></i></div>
                                                                </td>
                                                                <td className="text-nowrap align-middle">Pauline Jas</td>
                                                                <td className="text-nowrap align-middle"><span>26 Jan 2021</span></td>
                                                                <td className="text-center align-middle"><i className="fa fa-fw text-secondary cursor-pointer fa-toggle-off"></i></td>
                                                                <td className="text-center align-middle">
                                                                    <div className="btn-group align-top">
                                                                        <button className="btn btn-sm btn-outline-secondary badge" type="button" data-toggle="modal" data-target="#user-form-modal">Edit</button>
                                                                        <button className="btn btn-sm btn-outline-secondary badge" type="button"><i className="fa fa-trash"></i></button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="align-middle">
                                                                    <div className="custom-control custom-control-inline custom-checkbox custom-control-nameless m-0 align-top">
                                                                        <input type="checkbox" className="custom-control-input" id="item-3" />
                                                                        <label className="custom-control-label" for="item-3"></label>
                                                                    </div>
                                                                </td>
                                                                <td className="align-middle text-center">
                                                                    <div className="bg-light d-inline-flex justify-content-center align-items-center align-top itemdiv" ><i className="fa fa-fw fa-photo" ></i></div>
                                                                </td>
                                                                <td className="text-nowrap align-middle">Sherilyn Metzel</td>
                                                                <td className="text-nowrap align-middle"><span>27 Jan 2021</span></td>
                                                                <td className="text-center align-middle"><i className="fa fa-fw text-secondary cursor-pointer fa-toggle-on"></i></td>
                                                                <td className="text-center align-middle">
                                                                    <div className="btn-group align-top">
                                                                        <button className="btn btn-sm btn-outline-secondary badge" type="button" data-toggle="modal" data-target="#user-form-modal">Edit</button>
                                                                        <button className="btn btn-sm btn-outline-secondary badge" type="button"><i className="fa fa-trash"></i></button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="align-middle">
                                                                    <div className="custom-control custom-control-inline custom-checkbox custom-control-nameless m-0 align-top">
                                                                        <input type="checkbox" className="custom-control-input" id="item-4" />
                                                                        <label className="custom-control-label" for="item-4"></label>
                                                                    </div>
                                                                </td>
                                                                <td className="align-middle text-center">
                                                                    <div className="bg-light d-inline-flex justify-content-center align-items-center align-top itemdiv" ><i className="fa fa-fw fa-photo" ></i></div>
                                                                </td>
                                                                <td className="text-nowrap align-middle">Terrie Boaler</td>
                                                                <td className="text-nowrap align-middle"><span>20 Jan 2021</span></td>
                                                                <td className="text-center align-middle"><i className="fa fa-fw text-secondary cursor-pointer fa-toggle-on"></i></td>
                                                                <td className="text-center align-middle">
                                                                    <div className="btn-group align-top">
                                                                        <button className="btn btn-sm btn-outline-secondary badge" type="button" data-toggle="modal" data-target="#user-form-modal">Edit</button>
                                                                        <button className="btn btn-sm btn-outline-secondary badge" type="button"><i className="fa fa-trash"></i></button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="align-middle">
                                                                    <div className="custom-control custom-control-inline custom-checkbox custom-control-nameless m-0 align-top">
                                                                        <input type="checkbox" className="custom-control-input" id="item-5" />
                                                                        <label className="custom-control-label" for="item-5"></label>
                                                                    </div>
                                                                </td>
                                                                <td className="align-middle text-center">
                                                                    <div className="bg-light d-inline-flex justify-content-center align-items-center align-top itemdiv" ><i className="fa fa-fw fa-photo" ></i></div>
                                                                </td>
                                                                <td className="text-nowrap align-middle">Rutter Pude</td>
                                                                <td className="text-nowrap align-middle"><span>13 Jan 2021</span></td>
                                                                <td className="text-center align-middle"><i className="fa fa-fw text-secondary cursor-pointer fa-toggle-off"></i></td>
                                                                <td className="text-center align-middle">
                                                                    <div className="btn-group align-top">
                                                                        <button className="btn btn-sm btn-outline-secondary badge" type="button" data-toggle="modal" data-target="#user-form-modal">Edit</button>
                                                                        <button className="btn btn-sm btn-outline-secondary badge" type="button"><i className="fa fa-trash"></i></button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="align-middle">
                                                                    <div className="custom-control custom-control-inline custom-checkbox custom-control-nameless m-0 align-top">
                                                                        <input type="checkbox" className="custom-control-input" id="item-6" />
                                                                        <label className="custom-control-label" for="item-6"></label>
                                                                    </div>
                                                                </td>
                                                                <td className="align-middle text-center">
                                                                    <div className="bg-light d-inline-flex justify-content-center align-items-center align-top itemdiv" ><i className="fa fa-fw fa-photo" ></i></div>
                                                                </td>
                                                                <td className="text-nowrap align-middle">Clifford Benjamin</td>
                                                                <td className="text-nowrap align-middle"><span>25 Jan 2020</span></td>
                                                                <td className="text-center align-middle"><i className="fa fa-fw text-secondary cursor-pointer fa-toggle-on"></i></td>
                                                                <td className="text-center align-middle">
                                                                    <div className="btn-group align-top">
                                                                        <button className="btn btn-sm btn-outline-secondary badge" type="button" data-toggle="modal" data-target="#user-form-modal">Edit</button>
                                                                        <button className="btn btn-sm btn-outline-secondary badge" type="button"><i className="fa fa-trash"></i></button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="align-middle">
                                                                    <div className="custom-control custom-control-inline custom-checkbox custom-control-nameless m-0 align-top">
                                                                        <input type="checkbox" className="custom-control-input" id="item-7" />
                                                                        <label className="custom-control-label" for="item-7"></label>
                                                                    </div>
                                                                </td>
                                                                <td className="align-middle text-center">
                                                                    <div className="bg-light d-inline-flex justify-content-center align-items-center align-top itemdiv" ><i className="fa fa-fw fa-photo" ></i></div>
                                                                </td>
                                                                <td className="text-nowrap align-middle">Thedric Romans</td>
                                                                <td className="text-nowrap align-middle"><span>12 Jan 2019</span></td>
                                                                <td className="text-center align-middle"><i className="fa fa-fw text-secondary cursor-pointer fa-toggle-off"></i></td>
                                                                <td className="text-center align-middle">
                                                                    <div className="btn-group align-top">
                                                                        <button className="btn btn-sm btn-outline-secondary badge" type="button" data-toggle="modal" data-target="#user-form-modal">Edit</button>
                                                                        <button className="btn btn-sm btn-outline-secondary badge" type="button"><i className="fa fa-trash"></i></button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="align-middle">
                                                                    <div className="custom-control custom-control-inline custom-checkbox custom-control-nameless m-0 align-top">
                                                                        <input type="checkbox" className="custom-control-input" id="item-8" />
                                                                        <label className="custom-control-label" for="item-8"></label>
                                                                    </div>
                                                                </td>
                                                                <td className="align-middle text-center">
                                                                    <div className="bg-light d-inline-flex justify-content-center align-items-center align-top itemdiv" ><i className="fa fa-fw fa-photo" ></i></div>
                                                                </td>
                                                                <td className="text-nowrap align-middle">Haily Carthew</td>
                                                                <td className="text-nowrap align-middle"><span>27 Jan 2018</span></td>
                                                                <td className="text-center align-middle"><i className="fa fa-fw text-secondary cursor-pointer fa-toggle-on"></i></td>
                                                                <td className="text-center align-middle">
                                                                    <div className="btn-group align-top">
                                                                        <button className="btn btn-sm btn-outline-secondary badge" type="button" data-toggle="modal" data-target="#user-form-modal">Edit</button>
                                                                        <button className="btn btn-sm btn-outline-secondary badge" type="button"><i className="fa fa-trash"></i></button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="align-middle">
                                                                    <div className="custom-control custom-control-inline custom-checkbox custom-control-nameless m-0 align-top">
                                                                        <input type="checkbox" className="custom-control-input" id="item-9" />
                                                                        <label className="custom-control-label" for="item-9"></label>
                                                                    </div>
                                                                </td>
                                                                <td className="align-middle text-center">
                                                                    <div className="bg-light d-inline-flex justify-content-center align-items-center align-top itemdiv" ><i className="fa fa-fw fa-photo" ></i></div>
                                                                </td>
                                                                <td className="text-nowrap align-middle">Dorothea Joicey</td>
                                                                <td className="text-nowrap align-middle"><span>12 Dec 2017</span></td>
                                                                <td className="text-center align-middle"><i className="fa fa-fw text-secondary cursor-pointer fa-toggle-on"></i></td>
                                                                <td className="text-center align-middle">
                                                                    <div className="btn-group align-top">
                                                                        <button className="btn btn-sm btn-outline-secondary badge" type="button" data-toggle="modal" data-target="#user-form-modal">Edit</button>
                                                                        <button className="btn btn-sm btn-outline-secondary badge" type="button"><i className="fa fa-trash"></i></button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="align-middle">
                                                                    <div className="custom-control custom-control-inline custom-checkbox custom-control-nameless m-0 align-top">
                                                                        <input type="checkbox" className="custom-control-input" id="item-10" />
                                                                        <label className="custom-control-label" for="item-10"></label>
                                                                    </div>
                                                                </td>
                                                                <td className="align-middle text-center">
                                                                    <div className="bg-light d-inline-flex justify-content-center align-items-center align-top itemdiv" ><i className="fa fa-fw fa-photo" ></i></div>
                                                                </td>
                                                                <td className="text-nowrap align-middle">Mikaela Pinel</td>
                                                                <td className="text-nowrap align-middle"><span>10 Dec 2017</span></td>
                                                                <td className="text-center align-middle"><i className="fa fa-fw text-secondary cursor-pointer fa-toggle-off"></i></td>
                                                                <td className="text-center align-middle">
                                                                    <div className="btn-group align-top">
                                                                        <button className="btn btn-sm btn-outline-secondary badge" type="button" data-toggle="modal" data-target="#user-form-modal">Edit</button>
                                                                        <button className="btn btn-sm btn-outline-secondary badge" type="button"><i className="fa fa-trash"></i></button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="align-middle">
                                                                    <div className="custom-control custom-control-inline custom-checkbox custom-control-nameless m-0 align-top">
                                                                        <input type="checkbox" className="custom-control-input" id="item-11" />
                                                                        <label className="custom-control-label" for="item-11"></label>
                                                                    </div>
                                                                </td>
                                                                <td className="align-middle text-center">
                                                                    <div className="bg-light d-inline-flex justify-content-center align-items-center align-top itemdiv" ><i className="fa fa-fw fa-photo" ></i></div>
                                                                </td>
                                                                <td className="text-nowrap align-middle">Donnell Farries</td>
                                                                <td className="text-nowrap align-middle"><span>03 Dec 2017</span></td>
                                                                <td className="text-center align-middle"><i className="fa fa-fw text-secondary cursor-pointer fa-toggle-on"></i></td>
                                                                <td className="text-center align-middle">
                                                                    <div className="btn-group align-top">
                                                                        <button className="btn btn-sm btn-outline-secondary badge" type="button" data-toggle="modal" data-target="#user-form-modal">Edit</button>
                                                                        <button className="btn btn-sm btn-outline-secondary badge" type="button"><i className="fa fa-trash"></i></button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="align-middle">
                                                                    <div className="custom-control custom-control-inline custom-checkbox custom-control-nameless m-0 align-top">
                                                                        <input type="checkbox" className="custom-control-input" id="item-12" />
                                                                        <label className="custom-control-label" for="item-12"></label>
                                                                    </div>
                                                                </td>
                                                                <td className="align-middle text-center">
                                                                    <div className="bg-light d-inline-flex justify-content-center align-items-center align-top itemdiv" ><i className="fa fa-fw fa-photo" ></i></div>
                                                                </td>
                                                                <td className="text-nowrap align-middle">Letizia Puncher</td>
                                                                <td className="text-nowrap align-middle"><span>09 Dec 2017</span></td>
                                                                <td className="text-center align-middle"><i className="fa fa-fw text-secondary cursor-pointer fa-toggle-off"></i></td>
                                                                <td className="text-center align-middle">
                                                                    <div className="btn-group align-top">
                                                                        <button className="btn btn-sm btn-outline-secondary badge" type="button" data-toggle="modal" data-target="#user-form-modal">Edit</button>
                                                                        <button className="btn btn-sm btn-outline-secondary badge" type="button"><i className="fa fa-trash"></i></button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="d-flex justify-content-center">
                                                    <ul className="pagination mt-3 mb-0">
                                                        <li className="disabled page-item"><a href="#" className="page-link">‹</a></li>
                                                        <li className="active page-item"><a href="#" className="page-link">1</a></li>
                                                        <li className="page-item"><a href="#" className="page-link">2</a></li>
                                                        <li className="page-item"><a href="#" className="page-link">3</a></li>
                                                        <li className="page-item"><a href="#" className="page-link">4</a></li>
                                                        <li className="page-item"><a href="#" className="page-link">5</a></li>
                                                        <li className="page-item"><a href="#" className="page-link">›</a></li>
                                                        <li className="page-item"><a href="#" className="page-link">»</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-3 mb-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="text-center px-xl-3">
                                                <button className="btn btn-success btn-block" type="button" data-toggle="modal" data-target="#user-form-modal">New User</button>
                                            </div>
                                            <hr className="my-3" />
                                            <div className="e-navlist e-navlist--active-bold">
                                                <ul className="nav">
                                                    <li className="nav-item active"><a href="" className="nav-link"><span>All</span> <small>/ 32</small></a></li>
                                                    <li className="nav-item"><a href="" className="nav-link"><span>Active</span> <small>/ 16</small></a></li>
                                                    <li className="nav-item"><a href="" className="nav-link"><span>Selected</span> <small>/ 0</small></a></li>
                                                </ul>
                                            </div>
                                            <hr className="my-3" />
                                            <div>
                                                <div className="form-group">
                                                    <label>Date from - to:</label>
                                                    <div>
                                                        <input id="dates-range" className="form-control flatpickr-input" placeholder="01 May 21 - 27 May 21" type="text" readonly="readonly" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label>Search by Name:</label>
                                                    <div><input className="form-control w-100" type="text" placeholder="Name" value="" /></div>
                                                </div>
                                            </div>
                                            <hr className="my-3" />
                                            <div className="">
                                                <label>Status:</label>
                                                <div className="px-2">
                                                    <div className="custom-control custom-radio">
                                                        <input type="radio" className="custom-control-input" name="user-status" id="users-status-disabled" />
                                                        <label className="custom-control-label" for="users-status-disabled">Disabled</label>
                                                    </div>
                                                </div>
                                                <div className="px-2">
                                                    <div className="custom-control custom-radio">
                                                        <input type="radio" className="custom-control-input" name="user-status" id="users-status-active" />
                                                        <label className="custom-control-label" for="users-status-active">Active</label>
                                                    </div>
                                                </div>
                                                <div className="px-2">
                                                    <div className="custom-control custom-radio">
                                                        <input type="radio" className="custom-control-input" name="user-status" id="users-status-any" checked="" />
                                                        <label className="custom-control-label" for="users-status-any">Any</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Moda */}
                            <div className="modal fade" role="dialog" tabindex="-1" id="user-form-modal">
                                <div className="modal-dialog modal-lg" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Create User</h5>
                                            <button type="button" className="close" data-dismiss="modal">
                                                <span aria-hidden="true">×</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="py-1">
                                                <form className="form" novalidate="">
                                                    <div className="row">
                                                        <div className="col">
                                                            <div className="row">
                                                                <div className="col">
                                                                    <div className="form-group">
                                                                        <label>Full Name</label>
                                                                        <input className="form-control" type="text" name="name" placeholder="John Smith" value="John Smith" />
                                                                    </div>
                                                                </div>
                                                                <div className="col">
                                                                    <div className="form-group">
                                                                        <label>Username</label>
                                                                        <input className="form-control" type="text" name="username" placeholder="johnny.s" value="johnny.s" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col">
                                                                    <div className="form-group">
                                                                        <label>Email</label>
                                                                        <input className="form-control" type="text" placeholder="user@example.com" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col mb-3">
                                                                    <div className="form-group">
                                                                        <label>About</label>
                                                                        <textarea className="form-control" rows="5" placeholder="My Bio"></textarea>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-12 col-sm-6 mb-3">
                                                            <div className="mb-2"><b>Change Password</b></div>
                                                            <div className="row">
                                                                <div className="col">
                                                                    <div className="form-group">
                                                                        <label>Current Password</label>
                                                                        <input className="form-control" type="password" placeholder="••••••" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col">
                                                                    <div className="form-group">
                                                                        <label>New Password</label>
                                                                        <input className="form-control" type="password" placeholder="••••••" />
                                                                    </div>
                                                                </div>
                                                                <div className="col">
                                                                    <div className="form-group">
                                                                        <label>Confirm <span className="d-none d-xl-inline">Password</span></label>
                                                                        <input className="form-control" type="password" placeholder="••••••" /></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-sm-5 offset-sm-1 mb-3">
                                                            <div className="mb-2"><b>Keeping in Touch</b></div>
                                                            <div className="row">
                                                                <div className="col">
                                                                    <label>Email Notifications</label>
                                                                    <div className="custom-controls-stacked px-2">
                                                                        <div className="custom-control custom-checkbox">
                                                                            <input type="checkbox" className="custom-control-input" id="notifications-blog" checked="" />
                                                                            <label className="custom-control-label" for="notifications-blog">Blog posts</label>
                                                                        </div>
                                                                        <div className="custom-control custom-checkbox">
                                                                            <input type="checkbox" className="custom-control-input" id="notifications-news" checked="" />
                                                                            <label className="custom-control-label" for="notifications-news">Newsletter</label>
                                                                        </div>
                                                                        <div className="custom-control custom-checkbox">
                                                                            <input type="checkbox" className="custom-control-input" id="notifications-offers" checked="" />
                                                                            <label className="custom-control-label" for="notifications-offers">Personal Offers</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col d-flex justify-content-end">
                                                            <button className="btn btn-primary" type="submit">Save Changes</button>
                                                        </div>
                                                    </div>
                                                </form>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}