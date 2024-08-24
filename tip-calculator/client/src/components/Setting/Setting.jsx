function Setting() {
    return (
        <div>
            <h1>Setting</h1>
            <h3>Change tip percentage</h3>
            <label>Server</label>
            <input
                type="number"
                value="60"
            />
            <label>Kitchen</label>
            <input
                type="number"
                value="40"
            />
        </div>
    );
}

export default Setting;