import React from 'react';
import Moment from 'moment';
import 'moment/locale/id';
import Datetime from 'react-datetime';
import Select from 'react-select';
//import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ReactComponent as IconPlus } from './assets/img/icon/plus.svg';
import { ReactComponent as IconArrow } from './assets/img/icon/arrow.svg';
import styles from './App.module.css';

class App extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            headerLight: false,
            nama: '',
            tanggal: '',
            kelamin: '',
            alamat: '',
            pekerjaan: [{
                perusahaan: '',
                jabatan: '',
                tahunMulai: '',
                tahunAkhir: ''
            }],
            maxPekerjaan: 4,
            valid: false,
            done: false
        };
        
        this.handleScroll = this.handleScroll.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.pickerChange = this.pickerChange.bind(this);
        this.pickerRangeChange = this.pickerRangeChange.bind(this);
        this.addWork = this.addWork.bind(this);
        this.removeWork = this.removeWork.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.reSubmit = this.reSubmit.bind(this);
    }
    
    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll);
    }
    
    componentDidUpdate(prevProps, prevState){
        if(
            this.state.nama !== prevState.nama ||
            this.state.tanggal !== prevState.tanggal ||
            this.state.kelamin !== prevState.kelamin ||
            this.state.alamat !== prevState.alamat ||
            this.state.pekerjaan[0] !== prevState.pekerjaan[0]
        ){
            if(
                this.state.nama !== '' &&
                this.state.tanggal !== '' &&
                this.state.kelamin !== '' &&
                this.state.alamat !== '' &&
                this.state.pekerjaan[0].perusahaan !== '' &&
                this.state.pekerjaan[0].jabatan !== '' &&
                this.state.pekerjaan[0].tahunMulai !== '' &&
                this.state.pekerjaan[0].tahunAkhir !== ''
            ){
                this.setState({valid: true})
            }else{
                this.setState({valid: false})
            }
        }
    }
    
    componentWillUnmount(){
        window.addEventListener('scroll', this.handleScroll);
    }
    
    handleScroll(){
        let scrollTop = window.scrollY;
        
        if(scrollTop > 50){
            if(this.state.headerLight === false){
                this.setState({headerLight: true});
            }
        }else{
            if(this.state.headerLight === true){
                this.setState({headerLight: false});
            }
        }
    }
    
    inputChange(e){
        const valIndex = e.target.dataset.index || '',
              valName = e.target.name,
              valValue = e.target.value;
        
        if(valIndex === ''){
            this.setState({[valName]: valValue});
        }else{
            this.setState(prevState => ({
                pekerjaan: prevState.pekerjaan.map((el, index) => (
                    index === parseInt(valIndex) ? { ...el, [valName]: valValue } : el
                ))
            }));
        }
    }
    
    selectChange(value){
        this.setState({kelamin: value});
    }
    
    pickerChange(date){
        this.setState({tanggal: date});
    }
    
    pickerRangeChange(tahunMulai, valIndex){
        const thisState = this;
        
        return function onChange(date){
            if(tahunMulai === 'tahunMulai'){
                thisState.setState(prevState => ({
                    pekerjaan: prevState.pekerjaan.map((el, index) => (
                        index === parseInt(valIndex) ? { ...el, tahunMulai: date } : el
                    ))
                }));
            }else{
                thisState.setState(prevState => ({
                    pekerjaan: prevState.pekerjaan.map((el, index) => (
                        index === parseInt(valIndex) ? { ...el, tahunAkhir: date } : el
                    ))
                }));
            }
        }
    }
    
    addWork(){
        this.setState({
            pekerjaan: this.state.pekerjaan.concat({
                perusahaan: '',
                jabatan: '',
                tahunMulai: '',
                tahunAkhir: ''
            })
        });
    }
    
    removeWork(e){
        const valIndex = parseInt(e.target.dataset.index);
        
        this.setState({pekerjaan: this.state.pekerjaan.filter((work, index) => {
            return index !== valIndex;
        })});
    }
    
    formSubmit(){
//        let pekerjaan = '';
//        
//        this.state.pekerjaan.forEach((val, index) => {
//            const valIndex = index + 1;
//            
//            if(this.state.pekerjaan.length === valIndex){
//                pekerjaan = pekerjaan +
//                    'Perusahaan ' + valIndex + ': ' + val.perusahaan + '\n' +
//                    'Jabatan ' + valIndex + ': ' + val.jabatan + '\n' +
//                    'Tahun Mulai ' + valIndex + ': ' + val.tahunMulai + '\n' +
//                    'Tahun Akhir ' + valIndex + ': ' + val.tahunAkhir;
//            }else{
//                pekerjaan = pekerjaan +
//                    'Perusahaan ' + valIndex + ': ' + val.perusahaan + '\n' +
//                    'Jabatan ' + valIndex + ': ' + val.jabatan + '\n' +
//                    'Tahun Mulai ' + valIndex + ': ' + val.tahunMulai + '\n' +
//                    'Tahun Akhir ' + valIndex + ': ' + val.tahunAkhir + '\n';
//            }
//        });
//        
//        alert(
//            'Nama Lengkap: ' + this.state.nama + '\n' +
//            'Tanggal Lahir: ' + this.state.tanggal + '\n' +
//            'Jenis Kelamin: ' + this.state.kelamin + '\n' +
//            'Alamat: ' + this.state.alamat + '\n' +
//            'Riwayat Pekerjaan: \n' + pekerjaan
//        );
        
        this.setState({done: true});
    }
    
    reSubmit(){
        this.setState({
            nama: '',
            tanggal: '',
            kelamin: '',
            alamat: '',
            pekerjaan: [{
                perusahaan: '',
                jabatan: '',
                tahunMulai: '',
                tahunAkhir: ''
            }],
            valid: false,
            done: false
        });
    }
    
//    validBirth(current){
//        return current.isBefore(Moment(new Date()).subtract(40, 'years'));
//    }
//    
//    validMulai(current){
//        return current.isBefore(new Date());
//    }
//    
//    validAkhir(valIndex){
//        const thisState = this;
//        
//        return function isValidDate(current){
//            return current.isAfter(thisState.state.pekerjaan[valIndex].tahunMulai) && current.isBefore(new Date());
//        }
//    }
    
    render(){
        return(
            <>
                <header className={this.state.headerLight ? styles.light : ''}>
                    <section>
                        <a href="/"><img src={require('./assets/img/logo.png')} alt="Logo Jabar Digital Service" /></a>
                    </section>
                </header>
                <div className={styles.padtop}></div>
                <section className={this.state.done ? '' : styles.hide}>
                    <div className={`${styles.title} ${styles.sakses}`}>
                        <svg className={styles.iconsuc} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 183 183">
                            <g id="Layer_2" data-name="Layer 2">
                                <g id="Layer_1-2" data-name="Layer 1">
                                    <path className={styles.circle} d="M91.5,20A71.5,71.5,0,1,1,20,91.5,71.57,71.57,0,0,1,91.5,20m0-20A91.5,91.5,0,1,0,183,91.5,91.51,91.51,0,0,0,91.5,0Z"></path>
                                    <path className={styles.stripe1} d="M74.51,126.3l-25-24.67a5,5,0,0,1,0-7.07l7-7.11a5,5,0,0,1,7.08,0l25,24.84a5,5,0,0,1,0,7.11l-7,6.94A5,5,0,0,1,74.51,126.3Z"></path>
                                    <path className={styles.stripe2} d="M74.5,126.31l-7.1-7a5,5,0,0,1,0-7.11l50-49.79a5,5,0,0,1,7.08,0l7,7.09a5,5,0,0,1,0,7.07l-50,49.67A5,5,0,0,1,74.5,126.31Z"></path>
                                </g>
                            </g>
                        </svg>
                        Pengisian Formulir Sukses!
                        <span>Formulir Pendaftaran Online telah berhasil, terima kasih telah mendaftar pada <strong>Formulir Pendaftaran Online Jabar Digital Service</strong>.</span>
                    </div>
                    <ul className={styles.result}>
                        <li className={styles.fieldset}>
                            Data Pribadi
                        </li>
                        <li>
                            <span>Nama Lengkap</span>
                            {this.state.nama}
                        </li>
                        <li className={styles.lay2}>
                            <span>Tanggal Lahir</span>
                            {(new Date(this.state.tanggal)).getTime() > 0 ? Moment(this.state.tanggal).format('D MMMM YYYY') : this.state.tanggal}
                        </li>
                        <li className={styles.lay2}>
                            <span>Jenis Kelamin</span>
                            {this.state.kelamin.label}
                        </li>
                        <li>
                            <span>Alamat</span>
                            {this.state.alamat}
                        </li>
                        <li className={styles.fieldset}>
                            Daftar Riwayat Pekerjaan
                        </li>
                        {this.state.pekerjaan.map((val, index) => (
                            <li key={index}>
                                <div className={styles.numbering}>{index + 1}</div>
                                {val.perusahaan && val.jabatan && val.tahunMulai ? (
                                <ul>
                                    <li>
                                        {val.perusahaan}
                                    </li>
                                    <li>
                                        {val.jabatan}
                                    </li>
                                    <li>
                                        {(new Date(val.tahunMulai)).getTime() > 0 ? Moment(val.tahunMulai).format('YYYY') : val.tahunMulai} - {(new Date(val.tahunAkhir)).getTime() > 0 ? Moment(val.tahunAkhir).format('YYYY') : val.tahunAkhir}
                                    </li>
                                </ul>
                                ) : ''}
                            </li>
                        ))}
                        <li>
                            <button type="button" onClick={this.reSubmit} className={styles.back}><IconArrow /> Kembali dan isi data lainnya</button>
                        </li>
                    </ul>
                </section>
                <section className={this.state.done ? styles.hide : ''}>
                    <div className={styles.title}>
                        Formulir Pendaftaran Online
                        <span>Digunakan oleh pengguna dengan usia > 40 tahun.</span>
                    </div>
                    <TransitionGroup component="ul">
                        <CSSTransition timeout={500}>
                            <li className={styles.fieldset}>
                                Data Pribadi
                                <span>Isi sesuai dengan data yang tertera pada KTP.</span>
                                <em>* Wajib diisi</em>
                            </li>
                        </CSSTransition>
                        <CSSTransition timeout={500}>
                            <li className={this.state.nama ? styles.hasval : ''}>
                                <label>Nama Lengkap <em>*</em></label>
                                <input type="text" name="nama" value={this.state.nama} onChange={this.inputChange} />
                            </li>
                        </CSSTransition>
                        <CSSTransition timeout={500}>
                            <li className={this.state.tanggal ? `${styles.hasval} ${styles.lay2}` : styles.lay2}>
                                <label>Tanggal Lahir <em>*</em></label>
                                <span>Contoh Format:<br /><strong>17 Agustus 1945</strong></span>
                                <Datetime
                                    name="tanggal"
                                    value={this.state.tanggal}
                                    onChange={this.pickerChange}
                                    closeOnSelect={true}
                                    timeFormat={false}
                                    dateFormat="D MMMM YYYY"
                                    locale="Id"
                                />
                            </li>
                        </CSSTransition>
                        <CSSTransition timeout={500}>
                            <li className={this.state.kelamin ? `${styles.hasval} ${styles.lay2}` : styles.lay2}>
                                <label>Jenis Kelamin <em>*</em></label>
                                <Select
                                    value={this.state.kelamin}
                                    onChange={this.selectChange}
                                    className="sel-container"
                                    classNamePrefix="sel"
                                    isSearchable={false}
                                    placeholder=""
                                    options={[
                                        { value: 'pria', label: 'Pria' },
                                        { value: 'wanita', label: 'Wanita' }
                                    ]}
                                />
                            </li>
                        </CSSTransition>
                        <CSSTransition timeout={500}>
                            <li className={this.state.alamat ? styles.hasval : ''}>
                                <label>Alamat <em>*</em></label>
                                <textarea name="alamat" value={this.state.alamat} onChange={this.inputChange}></textarea>
                            </li>
                        </CSSTransition>
                        <CSSTransition timeout={500}>
                            <li className={styles.fieldset}>
                                Daftar Riwayat Pekerjaan
                                <span>Isi dengan minimal 1 riwayat pekerjaan dan maksimal 5 riwayat pekerjaan, dengan urutan terbaru hingga terdahulu.</span>
                                <em>* Wajib diisi</em>
                            </li>
                        </CSSTransition>
                        {this.state.pekerjaan.map((work, index) => (
                            <CSSTransition key={index} timeout={300}>
                                <li key={index}>
                                    <ul>
                                        <li><div>{index + 1}</div></li>
                                        <li>
                                            <ul>
                                                <li className={work.perusahaan ? styles.hasval : ''}>
                                                    <label>Nama Perusahaan {index === 0 && <em>*</em>}</label>
                                                    <input type="text" name="perusahaan" data-index={index} value={work.perusahaan} onChange={this.inputChange} />
                                                </li>
                                                <li className={work.jabatan ? styles.hasval : ''}>
                                                    <label>Jabatan {index === 0 && <em>*</em>}</label>
                                                    <input type="text" name="jabatan" data-index={index} value={work.jabatan} onChange={this.inputChange} />
                                                </li>
                                                <li className={work.tahunMulai ? `${styles.hasval} ${styles.lay2}` : styles.lay2}>
                                                    <label>Dari Tahun {index === 0 && <em>*</em>}</label>
                                                    <Datetime
                                                        name="tahunMulai"
                                                        value={work.tahunMulai}
                                                        onChange={this.pickerRangeChange('tahunMulai', index)}
                                                        closeOnSelect={true}
                                                        timeFormat={false}
                                                        dateFormat="YYYY"
                                                        locale="Id"
                                                    />
                                                </li>
                                                <li className={work.tahunAkhir ? `${styles.hasval} ${styles.lay2}` : styles.lay2}>
                                                    <label>Hingga Tahun {index === 0 && <em>*</em>}</label>
                                                    <Datetime
                                                        name="tahunAkhir"
                                                        value={work.tahunAkhir}
                                                        onChange={this.pickerRangeChange('tahunAkhir', index)}
                                                        closeOnSelect={true}
                                                        timeFormat={false}
                                                        dateFormat="YYYY"
                                                        locale="Id"
                                                    />
                                                </li>
                                            </ul>
                                        </li>
                                        <li><button className={styles.red} data-index={index} onClick={this.removeWork} disabled={this.state.pekerjaan.length === 1}><IconPlus /></button></li>
                                    </ul>
                                </li>
                            </CSSTransition>
                        ))}
                        <CSSTransition timeout={500}>
                            <li>
                                <button type="button" className={styles.addnew} onClick={this.addWork} disabled={this.state.pekerjaan.length > this.state.maxPekerjaan}>Tambah Riwayat Pekerjaan<IconPlus /></button>
                            </li>
                        </CSSTransition>
                        <CSSTransition timeout={500}>
                            <li>
                                <div className={styles.regtext}>
                                    Dengan menekan tombol "<strong>DAFTAR</strong>" dibawah ini, menyatakan bahwa data diisi dengan sebenar-benarnya, serta dapat menunjukan dokumen asli apabila dibutuhkan dan telah setuju dengan seluruh <a href="https://digitalservice.jabarprov.go.id/index.php/career/" target="_blank" rel="noopener noreferrer">Syarat dan Ketentuan</a> yang berlaku pada Formulir Pendaftaran Online Jabar Digital Service.
                                </div>
                            </li>
                        </CSSTransition>
                        <CSSTransition timeout={500}>
                            <li>
                                <button type="submit" onClick={this.formSubmit} className={styles.withanim} disabled={!this.state.valid}>Daftar <IconArrow /></button>
                            </li>
                        </CSSTransition>
                    </TransitionGroup>
                </section>
                <footer>
                    <section>
                        Copyrights &copy; 2020 <a href="https://digitalservice.jabarprov.go.id/" target="_blank" rel="noopener noreferrer">Jabar Digital Service</a>. All Rights Reserved.
                        <span>Designated trademarks and brands are the property of their respective owners.</span>
                    </section>
                </footer>
            </>
        );
    }
}

export default App;
